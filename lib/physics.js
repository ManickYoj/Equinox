const SETTINGS = {
  G: 6.674 * Math.pow(10, -11),
  stepSize: 60,
  trailBuffer: 5000,
};

class PhysicsEngine {

  // TODO: Load based on user, not on game_id
  constructor(gameId) {
    this.step = 0;
    this.typeToIds = {}

    // Maps the physicsObjects into a js object named physObj
    // with an {_id: physicsObject} mapping
    this.physObjs = PhysicsObjects.find({gameId})
      .fetch()
      .reduce((obj, curr) => {
        obj[curr._id] = curr;

        // Add a {type: _id} index for later fast lookups
        if (curr.type in this.typeToIds)
          this.typeToIds[curr.type].push(curr._id);
        else this.typeToIds[curr.type] = [curr._id];

        return obj;
      }, {}
    );
  }

  update(steps=1) {
    // -- Apply Gravity between all bodies excluding a body acting upon itself
    _.forEach(this.physObjs, (body1, id1) => {
      _.forEach(this.physObjs, (body2, id2) => {
        if (id1 !== id2) this.applyGravity(body1.transform, body2.transform);
      });
    });

    // -- Update Positions
    _.forEach(this.physObjs, body => { this.updatePosition(body.transform) });

    this.steps += steps;
  }

  getById(id) {
    return this.physObjs[id];
  }

  getByType(type) {
    return this.typeToIds[type].map((id) => {
      return this.physObjs[id];
    });
  }

  indexByType() {
    const temp = EJSON.clone(this.typeToIds);

    _.forEach(temp, (ids, type) => {
      temp[type] = ids.map((id) => {
        return this.physObjs[id];
      })
    });

    return temp;
  }

  vectorFromTo(p1, p2) {
    return p1.map((elt, ind) => {
      return p2[ind] - elt;
    })
  }

  distance(p1, p2) {
    const v = this.vectorFromTo(p1, p2);
    let sum = 0;
    v.forEach((elt) => {sum += Math.pow(elt, 2)})
    return Math.sqrt( sum );
  }

  directionFromTo(p1, p2) {
    const dist = this.distance(p1, p2);
    return this.vectorFromTo(p1, p2).map((elt) => elt / dist);
  }

  applyGravity (t1, t2) {
    const { G } = SETTINGS;

    // Calculate distance, gravity w/o masses, and the direction vector
    // from transform 1 to 2
    const dist = this.distance(t1.pos, t2.pos);
    const g = (G * t1.mass * t2.mass) / Math.pow(dist, 2);
    const rHat12 = this.directionFromTo(t1.pos, t2.pos);

    // Calculate actual force vectors
    const F1 = rHat12.map(elt => elt * g);
    const F2 = rHat12.map(elt => -elt * g);

    // Apply forces to transforms
    this.applyForce(F1, t1);
    this.applyForce(F2, t2);
  }

  applyForce (F, t, stepSize=SETTINGS.stepSize) {
    t.dPos = F.map((elt, ind) => t.dPos[ind] + (elt/t.mass) * stepSize);
  }

  updatePosition(t, stepSize=SETTINGS.stepSize) {
    t.dPos.forEach((elt, ind) => t.pos[ind] += elt * stepSize);
  }

  updateTrail(trail, newPoint, trailBuffer=SETTINGS.trailBuffer) {
    trail.points.push(EJSON.clone(newPoint));
    if (trail.points.length >= trailBuffer) {
      trail.points.shift();

      // Increment the offset if the buffer length would be exceeded
      trail.offset ++;

      // And wrap the buffer offset when it hits the buffer length
      if (trail.offset === trail.points.length) trail.offset = 0;
    }
  }
}

Physics = PhysicsEngine;
