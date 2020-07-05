import React from 'react';
import { Redirect, Route, Switch } from "react-router-dom"
import { ConnectedRouter } from "connected-react-router"
import history from "./history"
import Home from "containers/home/Home";
import Room from 'containers/room/Room'

function App() {
  return (
      <ConnectedRouter history={history}>
        <Switch>
          <Route path="/home" component={Home} />
          <Route
              path="/room/:roomId/:myName"
              render={({match}) => (
                <Room
                    roomId={match.params.roomId}
                    myName={match.params.myName}
                />
              )}
          />
          <Redirect exact={true} to="/home" />
        </Switch>
      </ConnectedRouter>
  );
}

export default App;
