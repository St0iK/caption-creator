import { createMuiTheme } from "@material-ui/core";

export const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#000", // main:'#f9bc60'
    },
    secondary: {
      main: "#b8c1ec",
    },
    tertiary: {
      main: "#f0f0f0",
    },
    background: {
      paper: "#232946",
    },
  },
});
