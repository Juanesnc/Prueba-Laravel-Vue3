<?php

use App\Http\Controllers\TaskController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::group([
    'prefix' => 'auth'
], function () {
    Route::post('/register', [AuthController::class, 'createUser']);
    Route::post('/login', [AuthController::class, 'loginUser']);
});

Route::group([
    'middleware' => 'auth:api',
    'prefix' => 'auth'
], function () {
    Route::get('/companies', [CompanyController::class, 'getCompanies']);
    Route::get('/company/{name}', [CompanyController::class, 'getId']);
    Route::get('/tasks/{id}', [TaskController::class, 'index']);
    Route::post('/task', [TaskController::class, 'store']);
    Route::put('/task/{id}', [TaskController::class, 'update']);
    Route::delete('/task/{id}', [TaskController::class, 'destroy']);
});

Route::middleware('auth:api')->get('userAuth', function (Request $request){
    return $request->user();
});


