const { PropTypes } = React;

CoordDisplayGroup = React.createClass({
  propTypes: {
    targetTransform: PropTypes.object.isRequired,
  },

  render () {
    const { targetTransform } = this.props;
    const [x, y] = targetTransform.pos;
    const [dx, dy] = targetTransform.dPos;

    return (
      <div className="coordinates">
          <CoordDisplay label={"x"} unit={"m"} value={x} />
          <CoordDisplay label={"y"} unit={"m"} value={y} />
          <CoordDisplay label={"dx"} unit={"m/s"} value={dx} />
          <CoordDisplay label={"dy"} unit={"m/s"} value={dy} />
          <CoordDisplay label={"speed"} unit={"m/s"}
            value={Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2))} />
      </div>
    );
  },
});


