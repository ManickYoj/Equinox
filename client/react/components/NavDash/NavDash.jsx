const { PropTypes } = React;

NavDash = React.createClass({
  propTypes: {
    physics: PropTypes.object.isRequired,
  },

  getInitialState() {
    return { targetId: null };
  },

  componentDidMount() {
    const { physics } = this.props;

    // Run Physics update
    setInterval(() => {
      physics.update();
      this.forceUpdate();
    }, 50);
  },

  _newTarget(targetId) {
    this.setState({targetId});
  },

  render() {
    const { physics } = this.props;
    const { targetId } = this.state;

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

    const target = physics.getById(targetId);

    return (
      <div id="NavDash" className="full-page center-content">
        <OrbitVisualizer physics={physics} target={target ? target.transform : null} />

        {/* TODO: Remove hardcoded ship */}
        <div style={hud}>

          Target Coordinates:
          <div style={hudPanel}>
            <CoordDisplayGroup
                target={target ? target.transform : null}
              />
          </div>

          Detected Objects:
          <div style={hudPanel}>
            <TargetSelector
              physics={physics}
              onTargetSelected={this._newTarget}
            />
          </div>
        </div>
      </div>
    );
  }
});
