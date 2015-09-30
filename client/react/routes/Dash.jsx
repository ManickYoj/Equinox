const { PropTypes } = React;



Dash = React.createClass({
  propTypes: {

  },

  getDefaultProps() {
    return {
      ship: {
        name: "USS Equinox",
        pos: {
          radius: 1.20,
          theta: 86.45,
          phi: 169.08,
        }
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

      "nav": <NavDash />,
    }

    this.setState({activeDisplay: displayMap[displayKey]});
  },
  
	render() {
    const { activeDisplay } = this.state;
    
		return (
			<div className="hud">
        {activeDisplay}
      </div>
		)
	}
})
