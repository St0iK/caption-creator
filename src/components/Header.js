import React, { useContext } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  makeStyles,
  IconButton,
  useTheme,
} from "@material-ui/core/";
import { ThemeContext } from "../themes/ThemeProvider";
import { Brightness5, Brightness4 } from "@material-ui/icons";

const Header = () => {
  const setTheme = useContext(ThemeContext);
  const classes = useStyles();
  const theme = useTheme();

  const handleThemeToggle = () => {
    theme.palette.type === "light"
      ? setTheme("darkTheme")
      : setTheme("lightTheme");
  };

  return (
    <div>
      <AppBar position="static" color="primary">
        <Toolbar className={classes.toolBar}>
          <Typography variant="h6" className={classes.cc}>
            Caption Creator
          </Typography>
          <section>
            <IconButton onClick={handleThemeToggle}>
              {theme.palette.type === "light" ? (
                <Brightness4 />
              ) : (
                <Brightness5 />
              )}
            </IconButton>
          </section>
        </Toolbar>
      </AppBar>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  toolBar: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

export default Header;
