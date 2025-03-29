<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\TaskController;


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::prefix('/employee')->group(function() {
    Route::get("/", [EmployeeController::class, 'index']);
    Route::post("/", [EmployeeController::class, 'store']);
    Route::get("/{id}", [EmployeeController::class, 'show']);
    Route::put("/{id}", [EmployeeController::class, 'update']);
    Route::delete("/{id}", [EmployeeController::class, 'destroy']);
});

Route::prefix('/task')->group(function(){
    Route::get("/", [TaskController::class, 'index']);
    Route::post("/", [TaskController::class, 'store']);
    Route::get("/{id}", [TaskController::class, 'show']);
    Route::put("/{id}", [TaskController::class, 'update']);
    Route::delete("/{id}", [TaskController::class, 'destroy']);
});