import { useState, useEffect } from 'react'
import { TravelRequest, FilterParams } from '../api/type'
import { fetchTravelRequests,initiatePayTravelRequest } from '../api/travelRequest'

export const useTravelRequests = (filters?: FilterParams) => {
  const [requests, setRequests] = useState<TravelRequest[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [payingIds, setPayingIds] = useState<String | null>(null)
  const [currentPaymentRequest, setCurrentPaymentRequest] = useState<TravelRequest | null>(null);

  useEffect(() => {
    const loadRequests = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const data = await fetchTravelRequests(filters)
        setRequests(data)
      } catch (err) {
        setError(err as Error)
      } finally {
        setIsLoading(false)
      }
    }

    loadRequests()
  }, [filters])

  const setActiveModalPayment = async (request: TravelRequest) => {
        setCurrentPaymentRequest(request);
        setPayingIds(request.id);
  };

  const initiatePay = async (amount: string) => {
    try {
        if(!currentPaymentRequest) return;

        setRequests((prev) =>
            prev.map((request) =>
                request.id === currentPaymentRequest.id ? { ...request, payments:[{...request.payments[0], status: 'pending', amount:amount}] } : request
            )
        )

        await initiatePayTravelRequest(currentPaymentRequest.id, amount)
        
        const data = await fetchTravelRequests(filters)
        setRequests(data)
    } catch (err) {
        setError(err as Error)
    }
  }

  return {
    requests,
    isLoading,
    error,
    initiatePay,
    isPaying: payingIds,
    closePaymentModal: () => setCurrentPaymentRequest(null),
    currentPaymentRequest,
    setActiveModalPayment,
    refetch: async () => {
      try {
        setIsLoading(true)
        const data = await fetchTravelRequests(filters)
        setRequests(data)
        setError(null)
      } catch (err) {
        setError(err as Error)
      } finally {
        setIsLoading(false)
      }
    },
  }
}