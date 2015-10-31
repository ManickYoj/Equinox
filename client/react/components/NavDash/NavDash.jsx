const { PropTypes } = React;

NavDash = React.createClass({
  propTypes: {
    physics: PropTypes.object.isRequired,
  },

  getInitialState() {
    return {
      targetId: null,
      trails: {},
    };
  },

  componentDidMount() {
    const { physics } = this.props;
    const { trails } = this.state;

    physics.getAll().forEach((obj) => {
      trails[obj._id] = new Trail();
    });

    // Run Physics update
    setInterval(() => {
      physics.update();
      physics.getAll().forEach((obj) => {
        trails[obj._id].update(obj.transform.pos);
      });

      this.forceUpdate();
    }, 50);
  },

  _newTarget(targetId) {
    this.setState({targetId});
  },

  _updateTrails() {

  },

  render() {
    const { physics } = this.props;
    const { targetId, trails } = this.state;

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
        <OrbitVisualizer
          physics={physics}
          trails={trails}
          target={target ? target.transform : null} />

        <div style={hud}>

          Target Coordinates:
          <div style={hudPanel}>
            <CoordDisplayGroup
                target={target ? target.transform : null}
              />
          </div>

          Set Reference Frame:
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
