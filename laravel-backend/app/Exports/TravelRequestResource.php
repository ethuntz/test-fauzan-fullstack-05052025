<?php

namespace App\Exports;

use App\Models\TravelRequest;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class TravelRequestsExport implements FromCollection, WithHeadings
{
    public function collection()
    {
        return TravelRequest::all();
    }

    public function headings(): array
    {
        return [
            'ID',
            'Employee Name',
            'Start Date',
            'End Date',
            'Destination',
            'Purpose',
            'Status',
            'Created At',
            'Updated At'
        ];
    }
}