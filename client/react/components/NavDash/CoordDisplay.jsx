const { PropTypes } = React;

CoordDisplay = React.createClass({
  propTypes: {
    label: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    percision: PropTypes.number,
    unit: PropTypes.string,
  },

  getDefaultProps () {
    return {
      percision: 5,
      unit: "",
    };
  },

  render () {
    const { unit, label, value, percision } = this.props;

    return (
      <div className="coordDisplay">
        <div>{label} ({unit}):</div>
        <div>{value.toPrecision(percision)}</div>
      </div>
    );
  },
});
