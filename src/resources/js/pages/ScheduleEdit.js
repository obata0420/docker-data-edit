import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import ScheduleFrom from '../components/ScheduleForm';


const useStyles = makeStyles((theme) => createStyles({
    card: {
        margin: theme.spacing(5),
        padding: theme.spacing(3),
    },
}));

function ScheduleEdit() {
    const classes = useStyles();

    const params = useParams();

    const [editData, setEditData] = useState({name:'', contents:''});

    useEffect(() => {
        if(params.id){
            getEditData();
        }
    }, [])

    const createSchedule = async() => {
        //空の場合弾く
        if(editData == ''){
            return;
        }
        await axios
            .post('/api/schedules/create', {
                name: editData.name,
                contents: editData.contents
            })
            .then((res) => {
                setEditData(res.data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    function getEditData(){
        axios
            .post('/api/schedules/edit', {
                id: params.id
            })
            .then(res => {
                setEditData(res.data);
            })
            .catch(() => {
                console.log('通信に失敗しました');
            });
    }

    function updateSchedule(){
        if(editData == ''){
            return;
        }
        axios
            .post('/api/schedules/update', {
                id: params.id,
                name: editData.name,
                contents: editData.contents
            })
            .then((res) => {
                setEditData(res.data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    function inputChange(e){
        const key = e.target.name;
        const value = e.target.value;
        editData[key] = value;
        let data = Object.assign({}, editData);
        setEditData(data);
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        {params.id ? 
                            <h1>タスク編集</h1>
                        :
                            <h1>タスク登録</h1>
                        }
                        <Card className={classes.card}>
                            {params.id ?
                                <ScheduleFrom data={editData}  inputChange={inputChange} btnFunc={updateSchedule} />
                            :
                                <ScheduleFrom data={editData}  inputChange={inputChange} btnFunc={createSchedule} />
                            }
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ScheduleEdit;