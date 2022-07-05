import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Button,
    Card,
    makeStyles,
    createStyles,
} from '@material-ui/core';
import MainTable from '../components/MainTable';
import ScheduleFrom from '../components/ScheduleForm';

//スタイルの定義
const useStyles = makeStyles((theme) => createStyles({
    card: {
        margin: theme.spacing(5),
        padding: theme.spacing(3),
    }
}));

//ヘッダーのコンテンツ用の配列定義
const headerList = ['名前', 'タスク内容', '編集', '完了'];

function Schedule() {
    //定義したスタイルを利用するための設定
    const classes = useStyles();

    // scheduleテーブルからデータ管理
    const [schedules, setSchedule] = useState([]);

    // フォームの入力値を管理
    const [formData, setFormData] = useState({name:'', contents:''});

    // 画面に到着したら実行
    useEffect(() => {
        getScheduleData();
    },[])

    const getScheduleData = () => {
        axios
            .get('/api/schedules')
            .then(response => {
                setSchedule(response.data);
                console.log(response.data);
            })
            .catch(() => {
                console.log('APIとの通信に失敗しました');
            });
    }

    const createPost = async() => {
        //空の場合弾く
        if(formData == ''){
            return;
        }
        await axios
            .post('/api/schedules/create', {
                name: formData.name,
                contents: formData.contents
            })
            .then((res) => {
                //戻り値をtodosにセット
                const tempSchedules = schedules;
                tempSchedules.push(res.data);
                setSchedule(tempSchedules);
                setFormData('');
            })
            .catch(error => {
                console.log(error);
            });
    }

    const deletePost = async (schedule) => {
        await axios
            .post('/api/schedules/delete', {
            id: schedule.id
        })
        .then((res) => {
            setSchedule(res.data);
        })
        .catch(error => {
            console.log(error);
        });
    }

    // 入力されたら都度値を変更
    const inputChange = (e) => {
        const key = e.target.name;
        const value = e.target.value;
        formData[key] = value;
        let data = Object.assign({}, formData);
        setFormData(data);
    }

    let rows = [];
    schedules.map((schedule) =>
        rows.push({
            name: schedule.name,
            contents: schedule.contents,
            editBtn: <Button color="secondary" variant="contained" key={schedule.id} href={`/schedule/edit/${schedule.id}`}>編集</Button>,
            deleteBtn: <Button color="primary" variant="contained" href="/" onClick={() => deletePost(schedule)}>完了</Button>,
        })
    );

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-10">
                    <div className="card">
                        <h1>タスク管理</h1>
                        <Card className={classes.card}>
                            <ScheduleFrom data={formData} inputChange={inputChange} btnFunc={createPost} />
                        </Card>
                        <Card className={classes.card}>
                            {/* テーブル部分の定義 */}
                            <MainTable headerList={headerList} rows={rows} />
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Schedule;