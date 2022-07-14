import React from 'react';
import { useNavigate } from "react-router-dom"
import { TextField, Button } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => createStyles({
    textArea: {
        marginRight: theme.spacing(2),
    },
    button: {
        marginRight: theme.spacing(1),
    }
}));



function ScheduleFrom(props) {

    const classes = useStyles();

    const navigate = useNavigate();

    const { data, inputChange, btnFunc } = props

    return (
        <form>
            <TextField id="name" label="タスク名" variant="outlined" className={classes.textArea} name="name" value={data.name} onChange={inputChange} />
            <TextField id="contents" label="内容" variant="outlined" className={classes.textArea} name="contents" value={data.contents} onChange={inputChange} />
            <Button color="primary" variant="contained" href="/" onClick={btnFunc}>登録</Button>
            <Button className={classes.button} color="inherit" variant="contained" onClick={ () => navigate(-1) }>戻る</Button>
        </form>

    );
}

export default ScheduleFrom;