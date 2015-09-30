const { PropTypes } = React;
const { RouteHandler } = ReactRouter;

App = React.createClass({
	render() {
		return (
			<div id="App">
        <RouteHandler />
      </div>
		)
	}
})