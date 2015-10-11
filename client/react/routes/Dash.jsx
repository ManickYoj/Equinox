const { PropTypes } = React;

Dash = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    // TODO: Setup publish/subscribe with appropriate permissions
    // PhysicsObjects.subscribe();
    const game = Games.findOne({});
    let physObjs;
    if (!_.isUndefined(game))
      physObjs = PhysicsObjects.find({game: game._id}).fetch();

    return {
      game,
      physObjs,
    };
  },

  getInitialState() {
    return { activeDisplayKey: "welcome" };
  },
  
  _displayMap(displayKey) {
    const { physObjs, game } = this.data;

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
        <NavDash physObjs={physObjs} />
      ),
    };

    return displayMap[displayKey];
  },
  
	render() {
    const { physObjs, game } = this.data;
    const { activeDisplayKey } = this.state;

    let activeDisplay =
      physObjs === undefined ||
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
