import React, {useContext} from "react";
import {withStyles} from "@material-ui/core/styles";
import {Grid, TextField} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';

const CueEditor = ({classes}) => {

    return (
        <Grid container spacing={2}>
            <Grid container item alignItems="center" spacing={1} wrap="nowrap" justify="space-between">
                <Grid item>
                    <TextField variant="outlined" label="Start Time"/>
                </Grid>
                <Grid item>
                    <TextField
                        variant="outlined"
                        label="Show For"
                    />
                </Grid>
                <Grid item>
                    <TextField variant="outlined" label="End Time"/>
                </Grid>
                <Grid item className={classes.headerEnd}>
                    <IconButton aria-label="Delete" edge="end">
                        <CloseIcon fontSize="small"/>
                    </IconButton>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    fullWidth
                    multiline
                    rows="2"
                    label="Caption text"
                    placeholder="Enter your caption here..."
                />
            </Grid>
        </Grid>
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

export default withStyles(styles)(CueEditor);
