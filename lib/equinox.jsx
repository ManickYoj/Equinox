const massiveBody = {
  transform: {
    pos: [0, 0],      // Position
    dPos: [0, 0],     // Velocity
    ang: [0],           // Angular displacement
    dAng: [0],          // Angular speed
    mass: 5.972 * Math.pow(10, 24),
  },

  radius: 6371000,
};

const ship = {
  name: "USS Phoenix",

  // All information about ship's location, direction, etc.
  transform: {
    pos: [6371000 + 418000, 0],
    dPos: [0, 8667],
    ang: [0],
    dAng: [0],
    mass: 370131
  },

  trails: {
    offset: 0,    // Offset for reading the array, useful, but weird
    points: [],
  }
};

const SETTINGS = {
  G: 6.674 * Math.pow(10, -11),
  stepSize: 60,
  trailBuffer: 5000,
};


Physics = {
  fullUpdate (iterations=1) {

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
};
