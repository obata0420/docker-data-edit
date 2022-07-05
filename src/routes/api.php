<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['middleware' => 'api'], function(){
    Route::get('schedules', [App\Http\Controllers\Api\ScheduleController::class, 'index']);
    Route::post('schedules/create', [App\Http\Controllers\Api\ScheduleController::class, 'create']);
    Route::post('schedules/edit', [App\Http\Controllers\Api\ScheduleController::class, 'edit']);
    Route::post('schedules/update', [App\Http\Controllers\Api\ScheduleController::class, 'update']);
    Route::post('schedules/delete', [App\Http\Controllers\Api\ScheduleController::class, 'delete']);
});


