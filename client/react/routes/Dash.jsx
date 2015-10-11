const { PropTypes } = React;

Dash = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    // TODO: Setup publish/subscribe with appropriate permissions
    // Games.subscribe("games");

    return {
      game: Games.findOne({}),
    };
  },

  getInitialState() {
    return { activeDisplayKey: "welcome" };
  },
  
  _displayMap(displayKey) {
    const { game } = this.data;

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
        <NavDash game={game} />
      ),
    };

    return displayMap[displayKey];
  },
  
	render() {
    const { game } = this.data;
    const { activeDisplayKey } = this.state;

    let activeDisplay = game === undefined ?
        <Typed messages={["Loading..."]} typeDelay={150} /> :
        this._displayMap(activeDisplayKey);
    
		return (
			<div id="Dash" className="full-page">
        {activeDisplay}
      </div>
		)
	}
})
