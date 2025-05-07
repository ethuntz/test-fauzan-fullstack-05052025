<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TravelRequestController;
use App\Http\Controllers\PaymentController;

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

// Travel Request Routes
Route::apiResource('travel-requests', TravelRequestController::class);
Route::get('travel-requests/export', [TravelRequestController::class, 'export']);

// Payment Routes
Route::post('travel-requests/{travelRequest}/pay', [PaymentController::class, 'initiatePayment']);
Route::post('payment/webhook', [PaymentController::class, 'handleWebhook']);