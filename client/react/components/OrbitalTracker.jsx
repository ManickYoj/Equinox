OrbitalTracker = React.createClass({
  getDefaultProps() {
    return {
      M: 5.972 * Math.pow(10, 24),
      G: 6.674 * Math.pow(10, -11),
      R: 6371000,
      stepSize: 10,
      trailLength: 50,
      trailSparsity: 10,
    }
  },

  getInitialState() {
    const { R, trailSparsity } = this.props;

    return {
      x: R + 418000,
      y: 0,
      dx: 0,
      dy: 7667,
      m: 370131,
      theta: 0,
      radius: 0,
      trails: [],
      trailCounter: trailSparsity,
      mapSize: 10000000,
    };
  },

  componentDidMount() {
    this._updateTransform();
  },

  _radius(x, y) {
    return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
  },

  _updateTransform() {
    const { M, G, stepSize } = this.props;
    let {x, y, dx, dy, m} = this.state;
    x += dx * stepSize;
    y += dy * stepSize;

    this._updateTrails(x, y);

    const radius = this._radius(x, y);
    const a = ( G * M ) / Math.pow(radius, 2);
    const theta = Math.atan2(y, x);

    dx -= a * stepSize *Math.cos(theta);
    dy -= a * stepSize * Math.sin(theta);

    // Honestly, don't quite understand this one - haven't done it out
    // but it seems to work
    const heading = Math.atan2(dy, dx) + Math.PI/2;

    this.setState({x, y, dx, dy, theta, heading, radius});

    setTimeout(this._updateTransform, 10);
  },

  _updateTrails(x, y) {
    const { trailSparsity, trailLength } = this.props;
    let { trails, trailCounter } = this.state;

    if (trailCounter == trailSparsity) {
      trails.push([x, y]);
      trailCounter = 0;
      if (trails.length >= trailLength) trails.shift();
    } else trailCounter++;

    this.setState({trailCounter});
  },

  _handleScroll(event) {
    let { mapSize } = this.state;

    const factor = event.deltaY;
    mapSize += .002 * mapSize * factor;
    event.preventDefault();

    this.setState({mapSize});
  },

  render() {
    const { R } = this.props;
    const { x, y, dx, dy, theta, heading, radius, trails, mapSize } = this.state;

    const size = 800;
    const scale = (size/2) / mapSize;

    return (
      <div id="OrbitalTracker" onWheel={this._handleScroll}>
        <OrbitVisualizer
          transform={[x, y, dx, dy, heading]}
          size={size}
          scale={scale}
          showTrails={true}
          trails={trails}
          bodyRadius={R}
        />

        <div className="coordinates">
          <CoordDisplay label={"x"} unit={"m"} value={x} />
          <CoordDisplay label={"y"} unit={"m"} value={y} />
          <CoordDisplay label={"dx"} unit={"m/s"} value={dx} />
          <CoordDisplay label={"dy"} unit={"m/s"} value={dy} />
          <CoordDisplay label={"radius"} unit={"m"} value={radius} />
          <CoordDisplay label={"altitude"} unit={"m"} value={radius - R} />
          <CoordDisplay label={"theta"} unit={"rad"} value={theta} />
          <CoordDisplay label={"map size"} unit={"m"} value={mapSize} />
        </div>
      </div>
    );
  }
});
