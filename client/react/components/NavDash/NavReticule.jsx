NavReticule = React.createClass({
  _generateTicks(numTicks, radius, boundWidth, boundHeight) {
    let ticks = [];
    let angle;
    let tickStyle;

    for(let i = 0; i < numTicks; i++) {
      angle = i * (Math.PI * 2 /numTicks);

      tickStyle = {
        transform: "rotate(" + (angle) + "rad)",
        position: "absolute",
        top: boundHeight/2 + radius * Math.sin(angle) + "px",
        left: boundWidth/2 + radius * Math.cos(angle) + "px",
      };

      ticks.push(
        <div key={"tick" + i} className="tick" style={tickStyle}>
          --
        </div>
      );
    }

    return ticks;
  },

  render() {
    const { ship } = this.props;

    const reticuleBound = 600;
    const reticuleRadius = 250;
    const ticks = this._generateTicks(
      12, reticuleRadius, reticuleBound, reticuleBound
    );
//    const reticuleStyle = undefined;
    const reticuleStyle = {
      transform: "rotateX(40deg) rotateY(30deg)",
    }

    const shipStyle = {
      transform: "rotate(" + ship.transform.heading +  "deg) translate(-50%, -50%)",
      position: "absolute",
      left: reticuleBound/2,
      top: reticuleBound/2,
      fontSize: "2em",
    }

    return (
      <div className="reticule" style={reticuleStyle}>
        {ticks}
        <div style={shipStyle}>↑</div>
      </div>
    );
  }
});
