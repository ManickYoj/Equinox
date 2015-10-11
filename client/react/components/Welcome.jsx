const { PropTypes } = React;

Welcome = React.createClass ({
  propTypes: {
    _onClick: PropTypes.func.isRequired,
    game: PropTypes.object.isRequired,
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
    const { game, clickPrompt, _onClick } = this.props;
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
            `USS HARDCODED Log`,
            `Navigation Officer
             Entry 0000`,
            `  `,
            `System: ${game.name}`,
          ]}
        />

        <div className="spacer"></div>
        
        {continueButton}
        
      </div>
    );
  }
});
