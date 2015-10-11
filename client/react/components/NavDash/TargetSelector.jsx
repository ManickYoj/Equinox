const { PropTypes } = React;

TargetSelector = React.createClass({
  propTypes: {
    physObjs: PropTypes.array.isRequired,
    currentTarget: PropTypes.number,
    onTargetSelected: PropTypes.func,
  },

  getDefaultProps() {
    return {
      currentTarget: null,
      onTargetSelected: () => {},
    }
  },

  render () {
    const { physObjs, currentTarget, onTargetSelected } = this.props;
    const objsByType = PhysicsObjects.splitByType(physObjs);

    const groupStyle = {
      marginBottom: "10px",
    }

    const itemStyle = {
      marginLeft: "10px",
    }

    const targetLists = _.map(objsByType, (objs, type) => {
      const items = objs.map((item, index) => {
        return (
          <div key={item.type + index} style={itemStyle}>
              {item.name}
          </div>
        );
      });

      return (
        <div key={type} style={groupStyle}>
          <div>{type.toUpperCase()}:</div>
          {items}
        </div>
      );
    });

    return (
      <div>
        {targetLists}
      </div>
    );
  },
});
