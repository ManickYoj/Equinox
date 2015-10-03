const {
  Route,
  NotFoundRoute,
  DefaultRoute,
  HistoryLocation
} = ReactRouter;

const routes = (
  <Route name="root" handler={App} path="/">
    <DefaultRoute handler={Login} />
    <Route path="dash" handler={Dash} />
    <NotFoundRoute handler={NotFound} />
  </Route>
);

Meteor.startup(() => {
  ReactRouter.run( routes, HistoryLocation, (Handler, state) => 
    {
      React.render( <Handler />, document.body)
    }
  );
});
