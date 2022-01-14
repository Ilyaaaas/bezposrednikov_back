<?php

use App\Http\Controllers\DictionaryController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\UserController;
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

Route::group(['middleware' => ['auth:api']], function () {
    Route::group(['prefix' => 'home'], function() {
        Route::get('/comments/{id}', [HomeController::class, 'getHomeComment']);
        Route::post('/comments', [HomeController::class, 'setHomeComment']);

        Route::post('/comment_like', [HomeController::class, 'setHomeLike']);
        Route::post('/set_favorite', [HomeController::class, 'setHomeFavorite']);
        Route::get('/get_favorite', [HomeController::class, 'getHomeFavorite']);
    });
});

Route::post('/home/upload_image', [ImageController::class, 'saveImage']);
Route::resource('/home', HomeController::class);

Route::group(['prefix' => 'users'], function() {
    Route::post('/register', [UserController::class, 'register'])->name('register.user');
    Route::post('/login', [UserController::class, 'login'])->name('login.user');
    Route::get('/view-profile', [UserController::class, 'viewProfile'])->name('profile.user');
    Route::get('/logout', [UserController::class, 'logout'])->name('logout.user');
    Route::post('/auth_social', [UserController::class, 'authsocial'])->name('login.authsocial');
});

Route::group(['prefix' => 'dic'], function() {
    Route::get('/all', [DictionaryController::class, 'all']);
    Route::get('/rc/{id_city}', [DictionaryController::class, 'rc']);
    Route::get('/district/{id_city}', [DictionaryController::class, 'district']);
});

Route::get('/{id}', [HomeController::class, 'show']);
Route::get('/', [HomeController::class, 'main']);


Route::get("/test", function (){
    return (new \App\Helpers\CountryHelpers())->AllCityFromCountry();
});

/*
Auth::routes();
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
*/
