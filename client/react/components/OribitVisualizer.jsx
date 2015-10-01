const { PropTypes } = React;

OrbitVisualizer = React.createClass({
  render () {
    const { transform, size, scale, trails, bodyRadius } = this.props;
    const [x, y, dx, dy, heading] = transform;

    const style = {
      height: size + "px",
      width: size + "px",
      position: "relative",
    }

    const planetStyle = {
      position: "absolute",
      top: size/2 + "px",
      left: size/2 + "px",
      width: bodyRadius * 2 * scale + "px",
      height: bodyRadius * 2 * scale + "px",
      transform: "translate(-50%, -50%)",
      border: "1px solid white",
      borderRadius: "50%",
    }

    const shipBoxStyle = {
      position: "absolute",
      top: size/2 + y * scale + "px",
      left: size/2 + x * scale + "px",
      transform: "translate(-50%, -50%)",
    }

    const shipStyle = {
      transform: "rotate(" + heading + "rad)",
    }

    let trailX, trailY, trailStyle;
    const trailIcons = trails.map((trailCoords, index) => {
      [trailX, trailY] = trailCoords;
      trailStyle = {
        position: "absolute",
        top: size/2 + trailY * scale + "px",
        left: size/2 + trailX * scale + "px",
        transform: "translate(-50%, -50%)",
      }
      return <div key={index} style={trailStyle}>+</div>;
    });

    return (
      <div id="OrbitVisualizer" style={style}>
        <div className="planet" style={planetStyle}></div>
        <div className="shipBox" style={shipBoxStyle}>
          <div className="ship" style={shipStyle}>↑</div>
        </div>
        {trailIcons}
      </div>
    );
  }
});
