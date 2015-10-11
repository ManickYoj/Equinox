const { PropTypes } = React;

NavDash = React.createClass({
  propTypes: {
    physObjs: PropTypes.array.isRequired,
  },

  getInitialState() {
    return { target: 0 };
  },

  componentDidMount() {
    const { physObjs } = this.props;

    // Run Physics update
    setInterval(() => {
      Physics.fullUpdate(physObjs);
      this.forceUpdate();
    }, 50);
  },

  _newTarget(target) {

  },

  render() {
    const { physObjs } = this.props;
    const { target } = this.state;


    return (
      <div id="NavDash" className="full-page center-content">
        <OrbitVisualizer physObjs={physObjs} target={target} />

        {/* TODO: Remove hardcoded ship */}
        <CoordDisplayGroup
          target={physObjs[target].transform}
          className="coordinates"
        />

        <TargetSelector
          physObjs={physObjs}
          onNewTarget={this._newTarget}
        />
      </div>
    );
  }
});
