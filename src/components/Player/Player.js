import React, {useContext} from "react";
import {withStyles} from "@material-ui/core/styles";
import {Grid, TextField} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';

const Player = ({classes}) => {

    return (
        <div>Player</div>
    );
};

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    grow: {
        flexGrow: 1,
        display: "flex",
        alignItems: "center"
    },
    icon: {
        marginRight: theme.spacing.unit,
        color: "green",
        fontSize: 45
    },
    mobile: {
        display: "none"
    },
    picture: {
        height: "50px",
        borderRadius: "90%",
        marginRight: theme.spacing.unit * 2
    }
});

export default withStyles(styles)(Player);
