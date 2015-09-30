const { PropTypes } = React;

Dash = React.createClass({
  getInitialState() {
    return { consoleWelcome: true };
  },
  
  _begin() {
    this.setState({consoleWelcome: false});
  },
  
	render() {
    const { consoleWelcome } = this.state;
    
		return (
			<div id="" className="hud">
        {consoleWelcome ? <Welcome _onClick={this._begin}/> : "HUD" }
      </div>
		)
	}
})