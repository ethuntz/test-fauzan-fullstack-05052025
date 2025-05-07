<?php

namespace App\Http\Controllers;

use App\Helpers\Response;
use App\Models\TravelRequest;
use App\Models\Payment;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class PaymentController extends Controller
{
    public function initiatePayment(Request $request, TravelRequest $travelRequest)
    {
        try{
            $validator = Validator::make($request->all(), [
                'amount' => 'required|numeric|min:0',
            ]);
    
            if ($validator->fails()) {
                return Response::validationError($validator->errors());
            }
    
            $payment = $travelRequest->payments()->create([
                'amount' => $request->amount,
                'status' => 'pending',
                'external_reference' => 'PAY-' . Str::random(10),
            ]);
    
            // Simulate payment processing (in real app, this would call payment gateway)
           return Response::success(url("/api/payment/webhook?reference={$payment->external_reference}"), 'Payment initiated successfully');
        }
        catch(Exception $e){
           return Response::error($e);
        }   
    }

    public function handleWebhook(Request $request)
    {
        try{
            $validator = Validator::make($request->all(), [
                'reference' => 'required|string',
                'status' => 'required|in:paid,failed',
            ]);
    
            if ($validator->fails()) {
                return Response::validationError($validator->errors());
            }
    
            $payment = Payment::where('external_reference', $request->reference)->firstOrFail();
            $payment->update(['status' => $request->status]);
    
            return Response::success(null, 'Payment status updated successfully');
        }
        catch(Exception $e){
            return Response::error($e);
        }   
    }
}