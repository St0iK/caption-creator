import React, {useContext} from "react";
import {withStyles} from "@material-ui/core/styles";
import {Grid, TextField} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';
import CueEditor from "./Cue/CueEditor";


const VTTEditor = ({classes}) => {

    return (
        <div className={classes.root}>
            VTT Editor
            <CueEditor/>
        </div>
    );
};

const styles = theme => ({
    root: {
        position: 'relative',
        flex: 1,
        width: 400,
        padding: 10
    }
});

export default withStyles(styles)(VTTEditor);
