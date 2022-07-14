import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import {
    Button,
    Card,
    TextField,
    makeStyles,
    createStyles,
} from '@material-ui/core';
import MainTable from '../components/MainTable';

//スタイルの定義
const useStyles = makeStyles((theme) => createStyles({
    card: {
        margin: theme.spacing(5),
        padding: theme.spacing(3),
    },
    textArea: {
        marginRight: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    button: {
        marginRight: theme.spacing(1),
    }
}));

//ヘッダーのコンテンツ用の配列定義
const headerList = ['名前', 'タスク内容', '編集', '完了'];

function Schedule() {
    //定義したスタイルを利用するための設定
    const classes = useStyles();

    const search = useLocation().search;
    const query = new URLSearchParams(search);
    let name_para = '';
    if(query.get('name')){
        name_para = query.get('name');
    }

    // scheduleテーブルからデータ管理
    const [schedules, setSchedule] = useState([]);

    const [nameVal, setName] = useState(name_para);

    // 画面に到着したら実行
    useEffect(() => {
        getScheduleData();
    },[])

    const getScheduleData = () => {
        axios
            .get('/api/schedules', {
                params: {
                    name: name_para
                }
            })
            .then(response => {
                setSchedule(response.data);
            })
            .catch(() => {
                console.log('APIとの通信に失敗しました');
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

    const nameCange = (e) => {
        setName(e.target.value);
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
                            <form>
                                <TextField id="name" label="タスク名" variant="outlined" className={classes.textArea} name="name" onChange={nameCange} value={nameVal} />
                                <Button  className={classes.button} color="primary" variant="contained" href={`/?name=${nameVal}`}>検索</Button>
                                <Button color="inherit" variant="contained" href='/'>検索リセット</Button>
                            </form>
                            <Button color="secondary" variant="contained" href='/schedule/edit/'>スケジュール登録</Button>
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