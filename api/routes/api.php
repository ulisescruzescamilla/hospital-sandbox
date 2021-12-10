<?php

use App\Http\Controllers\DoctorController;
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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// ! non-secure(public) endpoints, be careful
Route::prefix('doctors')->group(function () {
    Route::get('/',[DoctorController::class, 'index'])->name('doctors.index');
    Route::post('/',[DoctorController::class, 'store'])->name('doctors.create');
    Route::put('/{doctor}',[DoctorController::class, 'update'])->name('doctors.update');
    Route::delete('/{doctor}',[DoctorController::class, 'destroy'])->name('doctors.delete');
});
