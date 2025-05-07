<?php

namespace Tests\Feature;

use App\Models\TravelRequest;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PaymentTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_initiate_payment()
    {
        $travelRequest = TravelRequest::factory()->create();

        $response = $this->postJson("/api/travel-requests/{$travelRequest->id}/pay", [
            'amount' => 100.50,
        ]);

        $response->assertStatus(200)
            ->assertJson([
                'message' => 'Payment initiated successfully',
                'payment' => [
                    'amount' => 100.50,
                    'status' => 'pending',
                ]
            ]);
    }

    public function test_can_update_payment_via_webhook()
    {
        $travelRequest = TravelRequest::factory()->create();
        $payment = $travelRequest->payments()->create([
            'amount' => 100.50,
            'status' => 'pending',
            'external_reference' => 'PAY-TEST123',
        ]);

        $response = $this->postJson('/api/payment/webhook', [
            'reference' => $payment->external_reference,
            'status' => 'paid',
        ]);

        $response->assertStatus(200)
            ->assertJson([
                'message' => 'Payment status updated successfully',
                'payment' => [
                    'status' => 'paid',
                ]
            ]);

        $this->assertDatabaseHas('payments', [
            'id' => $payment->id,
            'status' => 'paid',
        ]);
    }
}