const { PropTypes } = React;

OrbitVisualizer = React.createClass({
  propTypes: {
    physics: PropTypes.object.isRequired,
    size: PropTypes.number,

    // Setting variables
    showTrail: PropTypes.bool,
    target: PropTypes.object,
    scrollSensitivity: PropTypes.number,
    trailLength: PropTypes.number,
    trailSparsity: PropTypes.number,
    lockCamToReference: PropTypes.bool,
  },

  getDefaultProps() {
    return {
      size: 800,
      showTrail: true,
      target: null,
      scrollSensitivity: .005,
      trailLength: 50,
      trailSparsity: 8,
      lockCamToReference: true,
    };
  },

  getInitialState() {
    const { size, trailSparsity, target } = this.props;
    const mapSize = 1000000000;

    return {
      mapSize,
      camPos: [0, 0],
      pan: [0, 0],
      scale: (size / 2) / mapSize,
    };
  },

  componentWillReceiveProps(nextProps) {
    const { lockCamToReference, target } = this.props;

    // FIXME: This code will likely trigger every change,
    // not just a target change as intended. Need to fix when
    // user preferences are implemented
    if (
      nextProps.target &&
      !_.isEqual(nextProps.target, target) &&
      lockCamToReference === true
    ) this.setState({pan: [0, 0], camPos: nextProps.target.pos});
  },

  componentWillMount() {
    window.addEventListener('keydown', this._handleKeyDown);
  },

  _handleScroll(event) {
    const { scrollSensitivity, size } = this.props;
    let { mapSize } = this.state;

    mapSize += scrollSensitivity * mapSize * event.deltaY;
    const scale = (size/2) / mapSize

    event.preventDefault();
    this.setState({ mapSize, scale });
  },

  _handleKeyDown(event) {
    let { mapSize, pan } = this.state;

    switch (event.keyCode) {
      case 68: // d
        pan[0] += mapSize * .1;
        break;
      case 65: // a
        pan[0] -= mapSize * .1;
        break;
      case 87: // w
        pan[1] -= mapSize * .1;
        break;
      case 83: // s
        pan[1] += mapSize * .1;
        break;
    }

    this.forceUpdate();
  },

  render () {
    const {
      physics, size, lockCamToReference,
      trailSparsity, trailLength, showTrail
    } = this.props;
    const { scale, camPos, pan, mapSize } = this.state;

    // Sum camera position and pan for an ajustment factor on the visualization
    const ax = camPos[0] + pan[0];
    const ay = camPos[1] + pan[1];

    let x, y;

    // -- Map body objects to elements
    // TODO: Move individual displays to ShipIcon and BodyIcon components,
    // then run the code for all bodies together
//    let objStyle;
//    const physElements = physics.getAll().map((obj, index) => {
//      [x, y] = obj.transform.pos;
//
//      objStyle = {
//        position: "absolute",
//        left: size/2 + (x - ax) * scale + "px",
//        top: size/2 + (y - ay) * scale + "px",
//        transform: "translate(-50%, -50%)",
//      }
//
//      if (obj.type === "body") {
//
//      }
//
//    });

    let bodyStyle;
    const bodyElements = physics.getByType("body").map((body, index) => {
      [x, y] = body.transform.pos;

      bodyStyle = {
        // Positioning correctly
        position: "absolute",
        width: body.typeDetails.radius * 2 * scale + "px",
        height: body.typeDetails.radius * 2 * scale + "px",
        left: size/2 + (x - ax) * scale + "px",
        top: size/2 + (y - ay) * scale + "px",
        transform: "translate(-50%, -50%)",

        // Styling
        border: "1px solid white",
        borderRadius: "50%",
      }

      return (
        <div
          key={"body" + index}
          className="body center-content"
          style={bodyStyle}>
          {body.name}
        </div>
      )
    });


    let shipBoxStyle, shipStyle;
    const shipElements = physics.getByType("ship").map((ship, index) => {
      [x, y] = ship.transform.pos;

      shipBoxStyle = {
        position: "absolute",
        left: size/2 + (x - ax) * scale + "px",
        top: size/2 + (y - ay) * scale + "px",
        transform: "translate(-50%, -50%)",
      }

      shipStyle = {
        transform: "rotate(" + ship.transform.ang + "rad)",
      }

      return(
        <div
          key={"ship" + index}
          className="shipBox"
          style={shipBoxStyle}>
            <div className="ship"
              style={shipStyle}>
              ↑
            </div>
        </div>
      );
    });

    const style = {
      height: size + "px",
      width: size + "px",
      position: "relative",
    }

//    let trailX, trailY, trailStyle;
//    const { offset } = ship.trail;
//    const trailElements = ship.trail.points.filter(
//      (trailCoord, index, arr) => {
//        return (
//          showTrail &&
//          (index + offset) % trailSparsity === 0 &&
//          index > arr.length - trailLength * trailSparsity
//        )
//      }
//    ).map((trailCoord, index, arr) => {
//      [trailX, trailY] = trailCoord;
//
//      trailStyle = {
//        position: "absolute",
//        top: size/2 + (trailY - my) * scale + "px",
//        left: size/2 + (trailX - mx) * scale + "px",
//        transform: "translate(-50%, -50%)",
//        opacity: 1 - (arr.length - index) / trailLength,
//      }
//
//      return <div key={"trail" + index} style={trailStyle}>+</div>;
//    });

    return (
      <div id="OrbitVisualizer" style={style}
        onWheel={this._handleScroll}>
        {bodyElements}
        {shipElements}


        {/*trailElements*/}
      </div>
    );
  }
});
