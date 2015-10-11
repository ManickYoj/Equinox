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

    const targetLists = _.map(objsByType, (objs, type) => {
      return (
        <div key={type}>
          {type.toUpperCase()}:
          {_.pluck(objs, 'name')}
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
