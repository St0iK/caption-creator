import React from "react";
import { Typography, Paper, makeStyles } from "@material-ui/core";

const Footer = (props) => {
  const classes = useStyles();
  return (
    <Paper square className={classes.root} elevation={8}>
      <div className={classes.footerSection}>
        <Typography variant="body2" color="inherit"></Typography>
        <div className={classes.footerDivider} />
        <Typography variant="body2" color="inherit">
          St0iK
        </Typography>
      </div>
    </Paper>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: 48,
    backgroundColor: theme.palette.primary.main,
    color: "white",
    zIndex: 1,
    padding: "0 20px",
    bottom: 0,
    width: "100%",
  },
  footerSection: {
    display: "flex",
    alignItems: "center",
  },
  footerDivider: {
    borderLeft: "2px solid white",
    marginLeft: 18,
    width: 20,
    height: 28,
  },
}));

export default Footer;
