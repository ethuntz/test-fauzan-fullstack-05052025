<?php

namespace Tests\Feature;

use App\Models\TravelRequest;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TravelRequestTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_get_all_travel_requests()
    {
        TravelRequest::factory()->count(3)->create();

        $response = $this->getJson('/api/travel-requests');

        $response->assertStatus(200)
            ->assertJsonCount(3, 'data');
    }

    public function test_can_create_travel_request()
    {
        $data = [
            'name' => 'Udin',
            'departure_date' => '2023-01-01',
            'arrival_date' => '2023-01-05',
            'destination' => 'New York',
            'purpose' => 'Business Meeting',
        ];

        $response = $this->postJson('/api/travel-requests', $data);

        $response->assertStatus(201)
            ->assertJsonFragment($data);
    }

    public function test_validation_for_travel_request_creation()
    {
        $response = $this->postJson('/api/travel-requests', []);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['name', 'departure_date', 'arrival_date', 'destination', 'purpose']);
    }

    public function test_can_filter_by_name()
    {
        TravelRequest::factory()->create(['name' => 'John Doe']);
        TravelRequest::factory()->create(['name' => 'Jane Smith']);

        $response = $this->getJson('/api/travel-requests?name=John');

        $response->assertStatus(200)
            ->assertJsonCount(1, 'data')
            ->assertJsonFragment(['name' => 'John Doe']);
    }

    public function test_can_export_to_excel()
    {
        TravelRequest::factory()->count(2)->create();

        $response = $this->get('/api/travel-requests/export');

        $response->assertStatus(200)
            ->assertHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    }
}