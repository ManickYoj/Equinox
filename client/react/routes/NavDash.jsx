const { PropTypes } = React;

NavDash = React.createClass({
  propTypes: {
    ship: PropTypes.object.isRequired,
  },

  render (){
    const { ship } = this.props;

    return (
      <div id="NavDash">
        <NavReticule ship={ship}/>
      </div>
    );
  }
});
