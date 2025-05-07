<?php

namespace App\Helpers;

class Response
{
    // Return success response
    public static function success($data = null, string $message = 'Success', int $code = 200)
    {
        return response()->json([
            'status' => 'success',
            'message' => $message,
            'data' => $data
        ], $code);
    }

    // Return paginated data response
    public static function paginated($data = null, string $message = 'Success', int $code = 200)
    {
        return response()->json([
            'status' => 'success',
            'message' => $message,
            'data' => [
                'data' =>$data->items(),
                'meta' => [
                            'current_page' => $data->currentPage(),
                            'last_page' => $data->lastPage(),
                            'per_page' => $data->perPage(),
                            'total' => $data->total(),
                        ],
                'links' => [
                            'first' => $data->url(1),
                            'last' => $data->url($data->lastPage()),
                            'prev' => $data->previousPageUrl(),
                            'next' => $data->nextPageUrl(),
                        ]       
            ]
        ], $code);
    }

    // Return error response
    public static function error(string $message = 'Error', int $code = 400, $errors = null)
    {
        return response()->json([
            'status' => 'error',
            'message' => $message
        ], $code);
    }

    // Return not found response
    public static function notFound(string $message = 'Resource not found')
    {
        return response()->json([
            'status' => 'error',
            'message' => $message
        ], 404);
    }

    // Return not found response
    public static function validationError($errors, string $message = 'Validation errors')
    {
        return response()->json([
            'status' => 'error',
            'message' => $message
        ], 422);
    }
}