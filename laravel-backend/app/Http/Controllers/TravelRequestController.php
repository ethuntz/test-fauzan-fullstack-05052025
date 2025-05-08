<?php

namespace App\Http\Controllers;

use App\Exports\TravelRequestExport;
use App\Models\TravelRequest;
use App\Http\Resources\TravelRequestResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Helpers\Response;
use Exception;
use Maatwebsite\Excel\Facades\Excel as FacadesExcel;

class TravelRequestController extends Controller
{
    public function index(Request $request)
    {
        try{
            $query = TravelRequest::with('payments'); 
            
            // Filter by employee name
            if ($request->has('name')) {
                $query->where('name', 'like', '%'.$request->name.'%');
            }
            
            // Filter by date range
            if ($request->has('departure_date')) {
                $query->where('departure_date', '>=', $request->departure_date);
            }
            
            if ($request->has('arrival_date')) {
                $query->where('arrival_date', '<=', $request->arrival_date);
            }
            if ($request->has('status')) {
                $query->whereHas('payments', function($q) use ($request) {
                    $q->where('status', $request->status);
                });
            }
            return Response::paginated(TravelRequestResource::collection($query->paginate(10)), 'Succes get data');
        }
        catch(Exception $e){
            return Response::error($e);
        }
    }

    public function store(Request $request)
    {
        try{
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'departure_date' => 'required|date',
                'arrival_date' => 'required|date|after_or_equal:start_date',
                'destination' => 'required|string|max:255',
                'purpose' => 'required|string',
            ]);
    
            if ($validator->fails()) {
                return Response::validationError($validator->errors());
            }
    
            $travelRequest = TravelRequest::create($validator->validated());
            
            new TravelRequestResource($travelRequest);
            
            return Response::success(null,'Succes insert new data');
        }
        catch(Exception $e){
            return Response::error($e);
        }
    }

    public function show(TravelRequest $travelRequest)
    {
        try{
            $response = new TravelRequestResource($travelRequest);

            return Response::success($response,'Succes get data');
        }
        catch(Exception $e){
            return Response::error($e);
        }
    }

    public function update(Request $request, TravelRequest $travelRequest)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|required|string|max:255',
            'deparutre_date' => 'sometimes|required|date',
            'arrival_date' => 'sometimes|required|date|after_or_equal:start_date',
            'destination' => 'sometimes|required|string|max:255',
            'purpose' => 'sometimes|required|string',
        ]);

        if ($validator->fails()) {
            return Response::validationError($validator->errors());
        }
        $travelRequest->update($validator->validated());

        return Response::success(null, 'Succes Update Data');
    }

    public function destroy(TravelRequest $travelRequest)
    {
        try{
            $travelRequest->update(["status" => '0']);
            return  Response::success(null, 'Success cancel travel request');
        }
        catch(Exception $e){
            return Response::error($e);
        }
    }

    public function export()
    {
        return FacadesExcel::download(new TravelRequestExport, 'travelRequest.xlsx');
    }
}