import React, { useContext } from "react";
import Context from "../context";
import { Redirect } from "react-router-dom";

const Splash = () => {
  const { state } = useContext(Context);
  return state.isAuth ? <Redirect to="/" /> : <Redirect to="/" />;
};

export default Splash;
