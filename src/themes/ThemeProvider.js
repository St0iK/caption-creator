import React, { createContext, useState } from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { themeCreator } from "./themeCreator";

export const ThemeContext = createContext((themeName) => {});

const ThemeProvider = (props) => {
  const curThemeName =
    localStorage.getItem("VTTEditor-appTheme") || "lightTheme";

  const [themeName, _setThemeName] = useState(curThemeName);
  // console.log(themeName)
  const theme = themeCreator(themeName);

  // console.log(theme)
  const setThemeName = (themeName) => {
    localStorage.setItem("VTTEditor-appTheme", themeName);
    _setThemeName(themeName);
  };

  return (
    <ThemeContext.Provider value={setThemeName}>
      <MuiThemeProvider theme={theme}>{props.children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
