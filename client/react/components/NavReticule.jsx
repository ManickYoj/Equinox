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
    const ticks = this._generateTicks(12, 250, 600, 600);

    return (
      <div className="reticule">
        {ticks}
      </div>
    );
  }
});
