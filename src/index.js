import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import App from "./pages/App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import store from "./store/store";
import ThemeProvider from "./themes/ThemeProvider";
import { CssBaseline } from "@material-ui/core";

const Root = () => {
  return (
    <Router>
      <Provider store={store}>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <ThemeProvider>
                <CssBaseline />
                <App />
              </ThemeProvider>
            )}
          />
        </Switch>
      </Provider>
    </Router>
  );
};

ReactDOM.render(<Root />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
