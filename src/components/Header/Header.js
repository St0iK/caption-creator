import React from "react";
import { AppBar, Toolbar, Typography, makeStyles } from "@material-ui/core/";
import HeaderMenu from "./headerMenu/headerMenu";

const Header = () => {
  const classes = useStyles();

  return (
    <div>
      <AppBar position="static" className={classes.root} color="primary">
        <Toolbar className={classes.toolBar}>
          <Typography variant="h6" className={classes.cc}>
            Caption Creator
          </Typography>
          <section>
            <HeaderMenu />
          </section>
        </Toolbar>
      </AppBar>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
  },
  icon: {
    color: "green",
    fontSize: 45,
  },
  mobile: {
    display: "none",
  },
  picture: {
    height: "50px",
    borderRadius: "90%",
  },
  toolBar: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

export default Header;
