const { PropTypes } = React;

CoordDisplayGroup = React.createClass({
  propTypes: {
    target: PropTypes.object,
  },

  getDefaultProps() {
    return {target: null};
  },

  render () {
    const { target } = this.props;

    if (target === null) return <div>No Target</div>;

    const [x, y] = target.pos;
    const [dx, dy] = target.dPos;

    return (
      <div>
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


