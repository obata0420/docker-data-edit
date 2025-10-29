<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Schedule;

class ScheduleController extends Controller
{
    //一覧を表示
    public function index(Request $request)
    {
        $schedule = new Schedule;
        if (isset($request->name) && strlen($request->name) > 0) {
            $schedule_list = $schedule->where('name', 'like', '%'.$request->name.'%')->orderBy('id', 'desc')->get();
        } else {
            $schedule_list = $schedule->orderBy('id', 'desc')->get();
        }
        return $schedule_list;
    }

    // 新規データ登録
    public function create(Request $request)
    {
        $schedule = new Schedule;
        $schedule->name = $request->name;
        $schedule->contents = $request->contents;
        $schedule->save();
        return $schedule;
    }

    // 編集画面
    public function edit(Request $request)
    {
        $schedule = Schedule::find($request->id);
        return $schedule;
    }

    // 更新処理
    public function update(Request $request)
    {
        $schedule = Schedule::find($request->id);
        $schedule->name = $request->name;
        $schedule->contents = $request->contents;
        $schedule->save();
        $schedules = Schedule::all();
        return $schedules;
    }

    // 削除処理
    public function delete(Request $request)
    {
        $schedule = Schedule::find($request->id);
        $schedule->delete();
        $schedule = Schedule::all();
        return $schedule;
    }
}
