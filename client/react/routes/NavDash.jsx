const { PropTypes } = React;

NavDash = React.createClass({
  propTypes: {
    ship: PropTypes.object.isRequired,
  },

  render (){
    const { ship } = this.props;
//<NavReticule ship={ship}/>
    return (
      <div id="NavDash">
        <OrbitalTracker />

      </div>
    );
  }
});
