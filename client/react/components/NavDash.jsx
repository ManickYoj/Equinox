const { PropTypes } = React;

NavDash = React.createClass({
  propTypes: {
    game: PropTypes.object.isRequired,
  },

  componentDidMount() {
    const { game } = this.props;

    // Run Physics update
    setInterval(() => {
      Physics.fullUpdate(game.bodies, game.ships);
      this.forceUpdate();
    }, 50);
  },

  render() {
    const { game } = this.props;
    const target = game.bodies[0].transform;

    return (
      <div id="NavDash" className="full-page center-content">
        <OrbitVisualizer game={game} target={target} />

        {/* TODO: Remove hardcoded ship */}
        <CoordDisplayGroup
          target={target}
          className="coordinates"
        />
      </div>
    );
  }
});
