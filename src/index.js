import React, { useContext, useReducer } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import App from "./pages/App";
import Splash from "./pages/Splash";
import ProtectedRoute from "./ProtectedRoute";
import * as serviceWorker from "./serviceWorker";

import Context from "./context";


const Root = () => {

  const initialState = useContext(Context);
  // const [state, dispatch] = useReducer(reducer, initialState);
  // console.log(state);

  return (
    <Router>
          <Switch>
            <Route exact path="/" component={App} />
            <Route path="/login" component={Splash} />
          </Switch>
    </Router>
  );
};

ReactDOM.render(<Root />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
