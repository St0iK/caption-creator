import { createMuiTheme } from "@material-ui/core";

export const lightTheme = createMuiTheme({
  palette: {
    type: "light",
    primary: {
      main: "#ff8ba7",
    },
    secondary: {
      main: "#ffc6c7",
    },
    tertiary: {
      main: "#f0f0f0",
    },
    background: {
      paper: "#faeee7",
    },
  },
});
