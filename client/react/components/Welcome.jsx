const { PropTypes } = React;

Welcome = React.createClass ({
  propTypes: {
    _onClick: PropTypes.func.isRequired,
  },
  
  getDefaultProps() {
    return {
      ship: {
        pos: {
          x: 17,
          y: 192
        }
      },
      
      sector: "Korprulu",
      
      officer: {
        type: "Navigation",
      }
    }
  },
  
  getInitialState() {
    return { showContinue: false };
  },
  
  render() {
    const { officer, sector, ship, _onClick } = this.props;
    const { showContinue } = this.state;
    
    const continueButton = (
      <div className="pulsating">[Click to Assume Control]</div>
    );
    
    // TODO: Animate text
    return (
      <div className="welcome" onClick={_onClick}>
        <Typed
          _onCompletion={ () => {this.setState({showContinue: true}); } }
          messages={[
            `Welcome, ${officer.type} Officer.`,
            `- Sector: ${sector}`,
            `- Position: ${ship.pos.x}, ${ship.pos.y}`
          ]}
        />

        <div className="spacer"></div>
        
        {showContinue ? continueButton : undefined}
        
      </div>
    );
  }
});