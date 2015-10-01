OrbitalTracker = React.createClass({
  getDefaultProps() {
    return {
      planets: [
        {
          // FIXME: planet disappears when I change, but orbit continues
          pos: [0, 0],
          mass: 5.972 * Math.pow(10, 24),
          radius: 6371000,
        },
      ],

      // Server settings
      G: 6.674 * Math.pow(10, -11), // Server/both
      stepSize: 60,                 // Server/both
      trailBuffer: 5000,            // How many recent positions to keep in memory
    }
  },

  getInitialState() {
    const { trailSparsity } = this.props;

    return {
      // Will move to props
      ship: {

        // All information about ship's location, direction, etc.
        transform: {
          pos: [6371000 + 418000, 0],    // Position
          dPos: [0, 8667],               // Velocity
          ang: 0,                        // Angular displacement
          dAng: 0,                       // Angular speed
        },

        stats: {
          mass: 370131,
        },

        trails: [],
      },

    };
  },

  componentDidMount() {
    this._updateTransform();
  },

  _radius(x, y) {
    return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
  },

  _updateTransform() {
    const { planets, G, stepSize } = this.props;
    const { ship } = this.state;

    let [x, y] = ship.transform.pos;
    let [dx, dy] = ship.transform.dPos;

    x += dx * stepSize;
    y += dy * stepSize;

    this._updateTrails(x, y);

    const radius = this._radius(...ship.transform.pos);

    let a, theta, px, py;
    const A = [0, 0];
    planets.forEach((planet) => {
      // Calculate acceleration value and direction
      [px, py] = planet.pos;
      a = ( G * planet.mass ) / Math.pow(radius, 2);
      theta = Math.atan2(py - y, px - x); // This could cause problems

      // Update acceleration vector
      A[0] += a * stepSize * Math.cos(theta);
      A[1] += a * stepSize * Math.sin(theta);
    });

    dx += A[0];
    dy += A[1];

    ship.transform.pos = [x, y];
    ship.transform.dPos = [dx, dy];
    this.forceUpdate();

    setTimeout(this._updateTransform, 50);
  },

  _updateTrails(x, y) {
    const { trailBuffer } = this.props;
    let { ship } = this.state;

    ship.trails.push([x, y]);
    if (ship.trails.length >= trailBuffer) ship.trails.shift();
  },

  render() {
    const { planets } = this.props;
    const { ship, theta, trails, mapSize } = this.state;

    const [x, y] = ship.transform.pos;
    const [dx, dy] = ship.transform.dPos;

    return (
      <div id="OrbitalTracker">
        <OrbitVisualizer
          ship={ship}
          planets={planets}
          mapSize={mapSize}
          trails={trails}
        />

        <div className="coordinates">
          <CoordDisplay label={"x"} unit={"m"} value={x} />
          <CoordDisplay label={"y"} unit={"m"} value={y} />
          <CoordDisplay label={"dx"} unit={"m/s"} value={dx} />
          <CoordDisplay label={"dy"} unit={"m/s"} value={dy} />
        </div>
      </div>
    );
  }
});
