export interface TravelRequest {
    id: string
    name: string
    departure_date: string
    arrival_date: string
    destination: string
    purpose: string
    payments:[{
      id? : string
      amount?: string
      status?: 'pending' | 'paid' | 'failed'
      external_reference? : string
    }]
  }
  
export interface FilterParams {
    name?: string
    departure_date?: string
    arrival_date?: string
    status?: 'pending' | 'paid' | 'failed'
}

export interface CreatePaymentPayload {
  amount: number;
  travel_request_id: number;
}

export interface Payment {
  id?: number; 
  amount: string;
  status: 'pending' | 'paid' | 'failed';
  external_reference?: string;
}
