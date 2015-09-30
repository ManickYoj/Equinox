//Login = React.createClass({
//  getInitialState() {
//    return {
//      hideLoginFields: true,
//    }
//  },
//  
//  _onTyped() {
//    this.setState({hideLoginFields: false});
//  },
//  
//  render() {
//    const { hideLoginFields } = this.state;
//    console.log(classNames('foo'));
//    //className={ classNames({hidden: hideLoginFields}); })
//    return (
//      <div>
//        <Typed
//          _onCompletion={this._onTyped}
//          messages={["Stasis disengaged."]}
//        />
//
//        <div >
//          ID: Francisci
//          PIN: Nick
//        </div>
//      </div>
//    );
//  }
//});