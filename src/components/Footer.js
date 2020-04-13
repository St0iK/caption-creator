import React, {useContext} from "react";
import Context from "../context";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";

const Footer = ({ classes }) => {
    const { state } = useContext(Context);

    return (
        <Paper square className={classes.root} elevation={8}>
            <div className={classes.footerSection}>
                <Typography variant="body2" color="inherit">

                </Typography>
                <div className={classes.footerDivider} />
                <Typography variant="body2" color="inherit">
                    St0iK
                </Typography>
            </div>
        </Paper>
    );
};

const styles = theme => ({
    root: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 48,
        backgroundColor: theme.palette.primary.main,
        color: 'white',
        zIndex: 1,
        padding: '0 20px',
        position: "fixed",
        bottom: 0,
        width: '100%'
    },
    footerSection: {
        display: 'flex',
        alignItems: 'center',
    },
    footerDivider: {
        borderLeft: '2px solid white',
        marginLeft: 18,
        width: 20,
        height: 28,
    },
});

export default withStyles(styles)(Footer);
