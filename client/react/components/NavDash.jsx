NavDash = React.createClass({
  getDefaultProps() {
    return {
      planets: [
        {
          transform: {
            pos: [0, 0],    // Position
            dPos: [0, 0],   // Velocity
            ang: [0],       // Angular displacement
            dAng: [0],      // Angular speed
            mass: 5.972 * Math.pow(10, 24),
          },
          radius: 6371000,
        },
      ],

      trailBuffer: 5000, // How many recent positions to keep in memory
    }
  },

  getInitialState() {
    const { trailSparsity } = this.props;

    return {
      // Will move to props
      ship: {
        name: "USS Phoenix",

        // All information about ship's location, direction, etc.
        transform: {
          pos: [6371000 + 418000, 0],    // Position
          dPos: [0, 9667],               // Velocity
          ang: [0],                        // Angular displacement
          dAng: [0],                       // Angular speed
          mass: 370131,
        },

        trail: {
          offset: 0,    // Offset for reading the array, useful, but weird
          points: [],
        }
      },

    };
  },

  // TODO: Move physics out
  componentDidMount() {
    setInterval(this._updateTransform, 50);
  },

  // TODO: Move physics out
  _updateTransform() {
    const { planets } = this.props;
    const { ship } = this.state;

    Physics.applyGravity(ship.transform, planets[0].transform);
    Physics.updatePosition(ship.transform);
    Physics.updatePosition(planets[0].transform);
    Physics.updateTrail(ship.trail, ship.transform.pos);
//    this._updateTrails(...ship.transform.pos)

    this.forceUpdate();
  },

  // TODO: Move 'physics' out
  _updateTrails(x, y) {
    const { trailBuffer } = this.props;
    let { points, offset } = this.state.ship.trail;

    points.push([x, y]);
    if (points.length >= trailBuffer) {
      points.shift();

      // Increment the offset if the buffer length would be exceeded
      this.state.ship.trail.offset ++;

      // And wrap the buffer offset when it hits the buffer length
      if (this.state.ship.trail.offset === points.length) offset = 0;
    }
  },

  render() {
    const { planets } = this.props;
    const { ship, theta, mapSize } = this.state;

    const [x, y] = ship.transform.pos;
    const [dx, dy] = ship.transform.dPos;

    return (
      <div id="NavDash" className="full-page center-content">
        <OrbitVisualizer
          ship={ship}
          planets={planets}
          mapSize={mapSize}
        />

        <div className="coordinates">
          <CoordDisplay label={"x"} unit={"m"} value={x} />
          <CoordDisplay label={"y"} unit={"m"} value={y} />
          <CoordDisplay label={"dx"} unit={"m/s"} value={dx} />
          <CoordDisplay label={"dy"} unit={"m/s"} value={dy} />
          <CoordDisplay label={"speed"} unit={"m/s"}
            value={Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2))} />
        </div>
      </div>
    );
  }
});
