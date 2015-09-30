const { PropTypes } = React;

Typed = React.createClass({
  propTypes: {
    messages: PropTypes.array.isRequired,
    typeDelay: PropTypes.number,
    _onCompletion: PropTypes.func,
  },
  
  getDefaultProps() {
    return { typeDelay: 25 };
  },

  getInitialState() {
    return {
      linesRendered: 0,
      charsRendered: 0,
      renderedMessages: [],
    };
  },
  
  componentDidMount() {
    // Begin the typing
    this._addChar();
  },

  componentWillUnmount() {
    // Clean up timeout
    clearTimeout(this.state.timeoutId);
  },

  _addChar () {
    const { messages } = this.props;
    let { linesRendered, charsRendered } = this.state;
    
    // Update the rendered messages
    const renderedMessages = messages.map((message, index) => {
      if (index < linesRendered) return message;
      else if (index === linesRendered) return message.substring(0, charsRendered + 1);
    });

    // If full message is not yet rendered
    if (linesRendered < messages.length) {
      // If the full line is not yet rendered increment the char count
      if (charsRendered < messages[linesRendered].length) charsRendered++;
      
      // If the full line has been rendered
      else {
        charsRendered = 0;
        linesRendered++;
      }

      // Run this function again after a delay
      const timeoutId = setTimeout(this._addChar, this.props.typeDelay);

      // Update the state of this component
      this.setState({
        renderedMessages,
        linesRendered,
        charsRendered,
        timeoutId,
      });
    } 
    
    // If the full message has been rendered, call the callback
    else this.props._onCompletion && this.props._onCompletion();
  },
  
  render () {
    const { renderedMessages } = this.state;
    
    const messages = renderedMessages.map((elt, ind) => {
      return <div key={ind} className="force-height">{elt}</div>;
    });
  
    return (
      <div>
        {messages}
      </div>
    );
  }
});
