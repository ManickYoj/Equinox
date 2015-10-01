const { PropTypes } = React;

Welcome = React.createClass ({
  propTypes: {
    _onClick: PropTypes.func.isRequired,
    ship: PropTypes.object.isRequired,
    officer: PropTypes.object.isRequired,
    sector: PropTypes.object.isRequired,
    clickPrompt: PropTypes.string,
  },
  
  getDefaultProps() {
    return {
      clickPrompt: "Click to Assume Control",
    };
  },
  
  getInitialState() {
    return { showContinue: false };
  },
  
  render() {
    const { officer, sector, ship, clickPrompt, _onClick } = this.props;
    const { showContinue } = this.state;
    
    let continueButton;
    if (showContinue) continueButton = (
      <div className="pulsating">[{clickPrompt}]</div>
    );

    return (
      <div className="welcome" onClick={_onClick}>
        <Typed
          _onCompletion={ () => {this.setState({showContinue: true}); } }
          messages={[
            `${ship.name} Log`,
            `${officer.displayName} ${officer.appellation}
             Entry ${officer.entry.padZeros()}`,
            `  `,
            `- Sector: ${sector.name}`,
            `- Ship Orbital Characteristics:`,
            `| Radius: ${ship.transform.radius} light-seconds`,
            `| Theta: ${ship.transform.theta} degrees`,
            `| Phi: ${ship.transform.phi} degrees`
          ]}
        />

        <div className="spacer"></div>
        
        {continueButton}
        
      </div>
    );
  }
});
