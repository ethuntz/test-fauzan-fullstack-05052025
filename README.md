# Technical-Test-Fauzan-FullStackDev-05052025
Deadline: Within 48 hours of receiving this test

##### Laravel Backend Test #####

## Task ##
You are required to implement a backend for travel report management.

### Requirements:
-- Create RESTful API to manage travel requests (CRUD).
-- Implement an export feature to Excel using Laravel Excel.
-- Add validation and basic unit tests.
-- API should support filtering by date and employee name.
-- Create API endpoint to initiate a payment linked to a travel request.
-- Implement payment status tracking (`pending`, `paid`, `failed`).
-- Simulate a webhook endpoint that updates payment status from an external payment gateway.
-- Each payment record should be associated with a travel request.


### Endpoints suggestion:
-- `GET /travel-requests`
-- `POST /travel-requests`
-- `PUT /travel-requests/{id}`
-- `DELETE /travel-requests/{id}`
-- `GET /travel-requests/export`
-- `POST /travel-requests/{id}/pay`
-- `POST /payment/webhook` (simulated webhook for status updates)

### Example Models:
-- `TravelRequest`: hasMany `Payments`
-- `Payment`: belongsTo `TravelRequest`

### Sample Fields for Payment:
-- `amount` (decimal)
-- `status` (`pending`, `paid`, `failed`)
-- `external_reference`
-- `travel_request_id` (foreign key)


###### React Frontend Test #####

## Task ##
You are required to build a frontend for the travel report system using React + TypeScript.

### Requirements:
-- Display list of travel requests from the backend API.
-- Implement filtering form (by date and employee name).
-- Create a download button to trigger export endpoint from the backend.
-- Use functional components and hooks.
-- Add a "Pay Now" button on each row of the travel request table.
   => This should call a backend API endpoint like `POST /travel-requests/{id}/pay`.
-- Show the current payment status beside each travel request (`pending`, `paid`, `failed`).
-- Implement a dropdown or filter to display travel requests by payment status.

## Bonus:
-- Use Axios or SWR for fetching data.
-- Responsive design with simple styling.
-- Use optimistic UI update after clicking "Pay Now".
-- Proper loading and error feedback.

## Section ## Max Points ##
- Backend - API Development:	10
- Backend - Payment Status Handling:	10
- Backend - Export to Excel:	10
- Backend - Code Structure & Cleanliness:	5
- Frontend - Data Display:	10
- Frontend - Filtering Feature:	10
- Frontend - Payment Status Display:	10
- Frontend - ‘Pay Now’ Button Functionality:	10
- Frontend - React Code Quality:	5
- Version Control - Commit Hygiene:	5
- Version Control - Git Flow Usage:	5
- Overall Completeness:	10
- Bonus - Use of Docker / CI/CD:	5

- Total Test 100 Points
