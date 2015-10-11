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

    const hud = {
      position: "absolute",
      top: "20px",
      left: "20px",
      width: "250px",
    };

    const hudPanel = {
      borderLeft: "1px solid white",
      marginBottom: "40px",
      marginTop: "5px",
      paddingLeft: "10px",
    };

    return (
      <div id="NavDash" className="full-page center-content">
        <OrbitVisualizer physObjs={physObjs} target={target} />

        {/* TODO: Remove hardcoded ship */}
        <div style={hud}>

          Target Coordinates:
          <div style={hudPanel}>
            <CoordDisplayGroup
                target={physObjs[target].transform}
              />
          </div>

          Detected Objects:
          <div style={hudPanel}>
            <TargetSelector
              physObjs={physObjs}
              onNewTarget={this._newTarget}
            />
          </div>
        </div>
      </div>
    );
  }
});
