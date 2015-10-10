const { PropTypes } = React;

Dash = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    const shipsHandle = Meteor.subscribe("ships");

    return {
      ship: Ships.findOne({}),
    };
  },

  getDefaultProps() {
    return {
      sector: {
        name: "Korprulu",
      },

      officer: {
        type: "nav",
        displayName: "Navigation",
        appellation: "Officer",
        entry: 0,
      }
    }
  },

  getInitialState() {
    return { activeDisplayKey: "welcome" };
  },
  
  _displayMap(displayKey) {
    const { officer, sector } = this.props;
    const { ship } = this.data;

    const displayMap = {
      welcome: (
        <Welcome
          _onClick={() => {
            this.setState({activeDisplayKey: officer.type})
          }}
          ship={ship}
          sector={sector}
          officer={officer}
        />
      ),

      nav: (
        <NavDash ship={ship} />
      ),
    };

    return displayMap[displayKey];
  },
  
	render() {
    const { ship } = this.data;
    const { activeDisplayKey } = this.state;

    let activeDisplay = ship === undefined ?
        <Typed messages={["Loading..."]} typeDelay={150} /> :
        this._displayMap(activeDisplayKey);
    
		return (
			<div id="Dash" className="full-page">
        {activeDisplay}
      </div>
		)
	}
})
