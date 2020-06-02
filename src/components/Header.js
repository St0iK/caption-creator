import React from "react";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const Header = ({ classes }) => {

  return (
    <div className={classes.root}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            BrightCove Caption generator
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

const styles = (theme) => ({
  root: {},
  grow: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
  },
  icon: {
    // marginRight: theme.spacing.unit,
    color: "green",
    fontSize: 45,
  },
  mobile: {
    display: "none",
  },
  picture: {
    height: "50px",
    borderRadius: "90%",
    // marginRight: theme.spacing.unit * 2,
  },
});

export default withStyles(styles)(Header);
