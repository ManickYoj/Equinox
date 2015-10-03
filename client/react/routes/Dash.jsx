const { PropTypes } = React;

Dash = React.createClass({
  propTypes: {

  },

  getDefaultProps() {
    return {
      ship: {
        name: "USS Equinox",
        transform: {
          radius: 1.20,
          theta: 86.45,
          phi: 23.08,
          heading: 50,
        },
      },

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
    const { officer, ship, sector } = this.props;

    return {
      activeDisplay: (
        <Welcome
          _onClick={() => {this._changeDisplay(officer.type)} }
          ship={ship}
          sector={sector}
          officer={officer}
        />
      ),
    };
  },
  
  _changeDisplay(displayKey) {
    const { officer, ship, sector } = this.props;

    const displayMap = {
      "welcome": (
        <Welcome
          _onClick={() => {this._changeDisplay(officer.type)} }
          ship={ship}
          sector={sector}
          officer={officer}
        />
      ),

      "nav": <NavDash ship={ship}/>,
    }

    this.setState({activeDisplay: displayMap[displayKey]});
  },
  
	render() {
    const { activeDisplay } = this.state;
    
		return (
			<div id="Dash" className="full-page">
        {activeDisplay}
      </div>
		)
	}
})
