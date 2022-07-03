<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Schedule;

class ScheduleController extends Controller
{
    //一覧を表示
    public function index()
    {
        $schedules = Schedule::all();
        return response()->json($schedules, 200);
    }

    // 新規データ登録
    public function create(Request $request)
    {
        $schedule = new Schedule;
        $schedule->name = $request->name;
        $schedule->contents = $request->contents;
        $schedule->save();
        return response()->json($schedule, 200);
    }
}
