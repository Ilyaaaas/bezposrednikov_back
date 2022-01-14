<?php

use App\Http\Controllers\Admin\AdsAdminController;
use App\Http\Controllers\Admin\MainAdminController;
use App\Http\Controllers\Admin\UsersAdminController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;


Route::get('/', [MainAdminController::class, 'index']);
Route::post('/login', [UserController::class, 'login']);

//Auth::routes();
Route::resource('/users', UsersAdminController::class);
Route::resource('/ads', AdsAdminController::class);
Route::get('/ads/comments/{id}', [AdsAdminController::class, "getComments"]);
