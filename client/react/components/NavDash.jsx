const { PropTypes } = React;

NavDash = React.createClass({
  propTypes: {
    ship: PropTypes.object.isRequired,
  },

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
    }
  },

  componentDidMount() {
    const { ship, planets } = this.props;

    // Run Physics update
    setInterval(() => {
      Physics.fullUpdate(planets, [ship]);
      this.forceUpdate();
    }, 50);
  },

  render() {
    const { planets, ship } = this.props;

    const [x, y] = ship.transform.pos;
    const [dx, dy] = ship.transform.dPos;

    return (
      <div id="NavDash" className="full-page center-content">
        <OrbitVisualizer
          ship={ship}
          planets={planets}
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
