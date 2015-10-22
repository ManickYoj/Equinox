const { PropTypes } = React;

Dash = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    // TODO: Setup publish/subscribe with appropriate permissions
    // PhysicsObjects.subscribe();
    const game = Games.findOne({});

    let physics;
    if (!_.isUndefined(game))
      physics = new Physics(game._id)

    return {
      game,
      physics,
    };
  },

  getInitialState() {
    return { activeDisplayKey: "welcome" };
  },
  
  _displayMap(displayKey) {
    const { physics, game } = this.data;

    const displayMap = {
      welcome: (
        <Welcome
          _onClick={() => {
            this.setState({activeDisplayKey: "nav"})
          }}
          game={game}
        />
      ),

      nav: (
        <NavDash physics={physics} />
      ),
    };

    return displayMap[displayKey];
  },
  
	render() {
    const { physics, game } = this.data;
    const { activeDisplayKey } = this.state;

    let activeDisplay =
      physics === undefined ||
      game === undefined ?
        <Typed messages={["Loading..."]} typeDelay={150} /> :
        this._displayMap(activeDisplayKey);
    
		return (
			<div id="Dash" className="full-page">
        {activeDisplay}
      </div>
		)
	}
})
