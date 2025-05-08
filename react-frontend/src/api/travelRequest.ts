import client from './client'
import { TravelRequest, FilterParams, CreatePaymentPayload, Payment } from './type'

export const fetchTravelRequests = async (filters?: FilterParams): Promise<TravelRequest[]> => {
  const response = await client.get('/travel-requests', { params: filters })
  return response.data.data.data
}
export const initiatePayTravelRequest = async (id: string,amount: any): Promise<TravelRequest> => {
  const response = await client.post(`/travel-requests/${id}/pay`, {amount: amount})
  return response.data
}

export const exportTravelRequests = async (filters?: FilterParams): Promise<void> => {
  const response = await client.get('/export', {
    params: filters,
    responseType: 'blob',
  })

  const url = window.URL.createObjectURL(new Blob([response.data]))
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', 'travel-requests.xlsx')
  document.body.appendChild(link)
  link.click()
  link.remove()
}