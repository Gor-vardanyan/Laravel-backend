<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UsersController;
use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () { return view('welcome'); });

Route::post('/user/store',  [UsersController::class,'store']);
Route::post('/user/login', 'App\Http\Controllers\UsersController@login');
Route::post('/user/rent', 'App\Http\Controllers\UsersController@rent');
Route::post('/user/downrent', 'App\Http\Controllers\UsersController@downRent');
Route::post('/user', [UsersController::class,'findusers']);
Route::get('/user/profile', 'App\Http\Controllers\UsersController@profile');

