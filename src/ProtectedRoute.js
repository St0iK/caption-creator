import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...rest }) => {

  return (
    <Route
      render={(props) =>
        <Component {...props} />
      }
      {...rest}
    />
  );
};

export default ProtectedRoute;
