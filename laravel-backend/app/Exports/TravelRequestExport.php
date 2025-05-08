<?php

namespace App\Exports;

use App\Models\TravelRequest;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class TravelRequestExport implements FromCollection, WithHeadings,WithMapping
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return TravelRequest::with('payments')->get();
    }

    public function headings(): array
    {
        return [
            'ID',
            'Nama ',
            'Tanggal Berangkat',
            'Tanggal Pulang',
            'Tujuan',
            'Alasam',
            'Status Pembayaran',
            'Jumlah Pembayaran'
        ];
    }

    public function map($travelRequest): array
    {
        $paymentStatus = $travelRequest->payments->isNotEmpty() 
            ? $travelRequest->payments->first()->status 
            : '-';
            
        $paymentAmount = $travelRequest->payments->isNotEmpty()
            ? $travelRequest->payments->first()->amount
            : 0;

        return [
            $travelRequest->id,
            $travelRequest->name,
            $travelRequest->departure_date,
            $travelRequest->arrival_date,
            $travelRequest->destination,
            $travelRequest->purpose,
            $paymentStatus,
            $paymentAmount
        ];
    }

    public function columnFormats(): array
    {
        return [
            'C' => 'dd/mm/yyyy', 
            'D' => 'dd/mm/yyyy', 
            'H' => '#,##0.00',   
        ];
    }
}
