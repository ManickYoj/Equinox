const SETTINGS = {
  G: 6.674 * Math.pow(10, -11),
  stepSize: 60,
  trailBuffer: 5000,
};

Physics = {
  fullUpdate (bodies, ships, iterations=1) {

    // -- Apply Forces & Update Velocities
    bodies.forEach((body1, ind1) => {

      // Apply gravity between all bodies, excluding a body acting upon itself
      bodies.forEach((body2, ind2) => {
        if (ind1 !== ind2) this.applyGravity(body1.transform, body2.transform);
      });

      // Apply gravity between ships and bodies.
      // TODO: Consider applying gravity between ships
      ships.forEach((ship) => {
        this.applyGravity(body1.transform, ship.transform);
      });
    });

    // -- Update Positions & Trails
    bodies.forEach(body => {
      this.updatePosition(body.transform);
    });

    ships.forEach(ship => {
      this.updatePosition(ship.transform);
      this.updateTrail(ship.trail, ship.transform.pos);
    });
  },

  vectorFromTo(p1, p2) {
    return p1.map((elt, ind) => {
      return p2[ind] - elt;
    })
  },

  distance(p1, p2) {
    const v = this.vectorFromTo(p1, p2);
    let sum = 0;
    v.forEach((elt) => {sum += Math.pow(elt, 2)})
    return Math.sqrt( sum );
  },

  directionFromTo(p1, p2) {
    const dist = this.distance(p1, p2);
    return this.vectorFromTo(p1, p2).map((elt) => elt / dist);
  },

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
  },

  applyForce (F, t, stepSize=SETTINGS.stepSize) {
    t.dPos = F.map((elt, ind) => t.dPos[ind] + (elt/t.mass) * stepSize);
  },

  updatePosition(t, stepSize=SETTINGS.stepSize) {
    t.dPos.forEach((elt, ind) => t.pos[ind] += elt * stepSize);
  },

  updateTrail(trail, newPoint, trailBuffer=SETTINGS.trailBuffer) {
    trail.points.push(EJSON.clone(newPoint));
    if (trail.points.length >= trailBuffer) {
      trail.points.shift();

      // Increment the offset if the buffer length would be exceeded
      trail.offset ++;

      // And wrap the buffer offset when it hits the buffer length
      if (trail.offset === trail.points.length) trail.offset = 0;
    }
  },
};
