import React, {useState} from 'react';
import {FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {makeStyles} from '@material-ui/core';
import {useDispatch, useSelector} from 'react-redux';
import Star from "../Star/Star";

const useStyles = makeStyles(theme => ({
    pageContent: {
        // margin: theme.spacing(5),
        padding: theme.spacing(3),
        margin: theme.spacing(2),
        width: theme.spacing(70),
        height: theme.spacing(75)
    }
}))

const useStyle = makeStyles(theme => ({
    root:{
        '& .MuiFormControl-root':{
            width: theme.spacing(50),
            margin:theme.spacing(2)
        }
    }
}))


function FeedBackForm(){

    const classes = useStyles();
    const classes2 = useStyle();
    const dispatch = useDispatch();

    const[name, setName] = useState();
    const[feedback, setFeedback] = useState();
    const[rating, setRating] = useState();


    //submit the data
    const handleSubmit = (e) => {
        e.preventDefault();

        const userData = {


        }
    }


    return (
        <div>
            <Paper className={classes.pageContent}>
                <h3>FeedBack Form</h3>
                <form className={classes2.root} onSubmit={handleSubmit}>
                    <Grid container>
                        <Grid item xs={6}>
                            <TextField
                                variant="outlined"
                                label="Name"
                                name="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <TextField
                                id="outlined-multiline-static"
                                label="Feed Back"
                                multiline
                                rows={3}
                                variant="outlined"
                                value={feedback}
                                onChange={(e) => setFeedback(e.target.value)}
                            />
                            <div style={{marginLeft:"30px"}}>
                                <Star/>
                            </div>

                            <Button variant="contained" type='Submit' style={{background: "#1976d2", color:"white", width:"150px", marginLeft:"150px", marginTop:"40px"}} >
                                SUBMIT
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </div>




    )
}

export default FeedBackForm
