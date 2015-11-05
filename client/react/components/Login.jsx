Login = React.createClass({
  mixins: [ReactRouter.Navigation],

  getInitialState() {
    return {
      pulsate: true,
      showContinue: false,
    };
  },

  _handleFocus(e) {
    this.setState({pulsate: false});
    e.target.placeholder = '';
  },

  _handleBlur(e, placeholder) {
    e.target.placeholder = placeholder;
    const [id, pw] = this._getValues();
    if (!id && !pw) this.setState({pulsate: true});
  },

  _onChange(e) {
    const [id, pw] = this._getValues();
    if (id && pw) this.setState({showContinue: true});
  },

  _getValues() {
    return [
      React.findDOMNode(this.refs.idInput).value,
      React.findDOMNode(this.refs.pwInput).value,
    ]
  },

  _login() {
    this.transitionTo('/dash')
//    Meteor.loginWithPassword(...this._getValues(), (err) => {
//      if (err) console.log(err); // Do a thing
//      // Do another thing
//    });
  },

  render() {
    const { pulsate, showContinue} = this.state;

    let continueText;
    if (showContinue)
      continueText = <Typed messages={["> authorize <"]} typeDelay={90} />;

    const animation = pulsate ?
      "pulsate 1.5s ease-in-out alternate infinite":
      "none";

    const loginStyle = {
      animation,
      fontSize: "1.15rem",
      marginTop: "1rem",
      marginBottom: "2rem",
    }

    return(
      <div id="Login" className="full-page">
        <form onSubmit={this._login} className="full-page center-content">
          <div className="title">EQUINOX</div>
            <div style={loginStyle}>
              [
              <input ref="idInput" type="text" placeholder="identification"
                onFocus={this._handleFocus} onChange={this._onChange}
                onBlur={(e) => {this._handleBlur(e, "identification")}}
              />
              ] [
              <input ref="pwInput" type="password" placeholder="passcode"
                onFocus={this._handleFocus} onChange={this._onChange}
                onBlur={(e) => {this._handleBlur(e, "passcode")}}
              />
              ]
            </div>
          <button className="spacer glowing" onClick={this._login}> {continueText} </button>
        </form>
      </div>
    );
  }
})
