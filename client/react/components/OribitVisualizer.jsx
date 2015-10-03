const { PropTypes } = React;

OrbitVisualizer = React.createClass({
  propTypes: {
    ship: PropTypes.object.isRequired,
    planets: PropTypes.array.isRequired,
    size: PropTypes.number,

    // Setting variables
    showTrails: PropTypes.bool,
    followShip: PropTypes.bool,
    scrollSensitivity: PropTypes.number,
    trailLength: PropTypes.number,
    trailSparsity: PropTypes.number,
  },

  getDefaultProps() {
    return {
      size: 800,
      showTrails: true,
      followShip: false,
      scrollSensitivity: .002,
      trailLength: 20,
      trailSparsity: 5,
    };
  },

  getInitialState() {
    const { size, trailSparsity } = this.props;
    const mapSize = 10000000;

    return {
      mapSize,
      mapCenter: [0, 0],
      scale: (size/2) / mapSize,
    };
  },

  componentWillReceiveProps(nextProps) {
    const { followShip } = this.props;

    if (followShip) this.setState({
      mapCenter: nextProps.ship.transform.pos
    });
  },

  _handleScroll(event) {
    const { scrollSensitivity, size } = this.props;
    let { mapSize } = this.state;

    mapSize += scrollSensitivity * mapSize * event.deltaY;
    const scale = (size/2) / mapSize

    event.preventDefault();
    this.setState({ mapSize, scale });
  },

  render () {
    const {
      ship, size, planets,
      trailSparsity, trailLength, showTrails
    } = this.props;
    const { scale, mapCenter, mapSize } = this.state;

    const [mx, my] = mapCenter;
    const [x, y] = ship.transform.pos;

    let planetStyle, px, py;
    const planetElements = planets.map((planet, index) => {
      [px, py] = planet.transform.pos;

      planetStyle = {
        // Positioning correctly
        position: "absolute",
        width: planet.radius * 2 * scale + "px",
        height: planet.radius * 2 * scale + "px",
        left: size/2 + (px - mx) * scale + "px",
        top: size/2 + (py - my) * scale + "px",
        transform: "translate(-50%, -50%)",

        // Styling
        border: "1px solid white",
        borderRadius: "50%",
      }

      return (
        <div
          key={"planet" + index}
          className="planet"
          style={planetStyle}>
        </div>
      )
    });

    const style = {
      height: size + "px",
      width: size + "px",
      position: "relative",
    }

    const shipBoxStyle = {
      position: "absolute",
      top: size/2 + (y - my) * scale + "px",
      left: size/2 + (x - mx) * scale + "px",
      transform: "translate(-50%, -50%)",
    }

    const shipStyle = {
      transform: "rotate(" + ship.transform.ang + "rad)",
    }

    let trailX, trailY, trailStyle;
    const trailOffset = ship.trails.offset;
    const trailElements = ship.trails.points.filter(
      (trailCoord, index, arr) => {
        return (
          showTrails &&
          (index + trailOffset) % trailSparsity === 0 &&
          index > arr.length - trailLength * trailSparsity
        )
      }
    ).map((trailCoord, index, arr) => {
      [trailX, trailY] = trailCoord;

        trailStyle = {
          position: "absolute",
          top: size/2 + (trailY - my)* scale + "px",
          left: size/2 + (trailX - mx) * scale + "px",
          transform: "translate(-50%, -50%)",
          opacity: 1 - (arr.length - index) / trailLength,
        }

        return <div key={"trail" + index} style={trailStyle}>+</div>;
    });

    return (
      <div id="OrbitVisualizer" style={style} onWheel={this._handleScroll}>
        {planetElements}

        <div className="shipBox" style={shipBoxStyle}>
          <div className="ship" style={shipStyle}>↑</div>
        </div>

        {trailElements}
      </div>
    );
  }
});
