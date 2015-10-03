const { PropTypes } = React;
const { RouteHandler } = ReactRouter;

App = React.createClass({
	render() {
		return (
			<div id="App" className="full-page">
        <RouteHandler />
      </div>
		)
	}
})
