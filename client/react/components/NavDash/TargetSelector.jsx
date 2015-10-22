const { PropTypes } = React;

TargetSelector = React.createClass({
  propTypes: {
    physics: PropTypes.object.isRequired,
    currentTarget: PropTypes.string,
    onTargetSelected: PropTypes.func,
  },

  getDefaultProps() {
    return {
      currentTarget: null,
      onTargetSelected: () => {},
    }
  },

  render () {
    const { physics, currentTarget, onTargetSelected } = this.props;

    const groupStyle = {
      marginBottom: "10px",
    }

    const itemStyle = {
      marginLeft: "10px",
      display: "block",
    }

    const targetLists = _.map(physics.indexByType(), (objs, type) => {
      const items = objs.map((item, index) => {

        let renderedName = item.name;
        if (item._id === currentTarget) renderedName = "[" + item.name + "]";
        return (
          <button key={item.type + index} style={itemStyle}
            onClick={() => {onTargetSelected(item._id)}}>
              {renderedName}
          </button>
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
