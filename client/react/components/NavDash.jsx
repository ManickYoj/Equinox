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

    return (
      <div id="NavDash" className="full-page center-content">
        <OrbitVisualizer game={game}/>

        {/* TODO: Remove hardcoded ship */}
        <CoordDisplayGroup
          className="coordinates"
          targetTransform={game.ships[0].transform}
        />
      </div>
    );
  }
});
