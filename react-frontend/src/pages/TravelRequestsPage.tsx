// pages/TravelRequestsPage.tsx
import React, { useState } from 'react'
import { FilterParams, TravelRequest } from '../api/type'
import { exportTravelRequests } from '../api/travelRequest'
import FilterForm from '../components/FilterForm'
import PaymentStatusFilter from '../components/PaymentStatusFilter'
import TravelRequestTable from '../components/TravelRequestTable'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorAlert from '../components/ErrorAlert'
import { useTravelRequests } from '../hooks/useTravelRequests'
import PaymentModal from '../components/PaymentModal'

const TravelRequestsPage: React.FC = () => {
  const [filters, setFilters] = useState<FilterParams>({})
  const [isExporting, setIsExporting] = useState(false)
  const [exportError, setExportError] = useState<string | null>(null)
  
  const {
    requests,
    isLoading,
    error,
    setActiveModalPayment,
    currentPaymentRequest,
    initiatePay,
    refetch,
    closePaymentModal
  } = useTravelRequests(filters)

  const handleFilter = (newFilters: FilterParams) => {
    setFilters((prev) => ({ ...prev, ...newFilters }))
  }

  const handleStatusFilter = (status: FilterParams['status']) => {
    setFilters((prev) => ({ ...prev, status }))
  }

  const handleExport = async () => {
    try {
      setIsExporting(true)
      setExportError(null)
      await exportTravelRequests(filters)
    } catch (err) {
      setExportError('Failed to export travel requests. Please try again.')
      console.error('Export failed:', err)
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <>
     <PaymentModal
        isOpen={!!currentPaymentRequest}
        onClose={closePaymentModal}
        onSubmit={async (amount: string) => {
          initiatePay(amount);
        }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Travel Requests</h1>
        
        <div className="mb-6">
          <button
            onClick={handleExport}
            disabled={isExporting}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isExporting ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Exporting...
              </>
            ) : (
              'Download Report'
            )}
          </button>
          {exportError && (
            <div className="mt-2">
              <ErrorAlert message={exportError} onRetry={handleExport} />
            </div>
          )}
        </div>
        
        <FilterForm onFilter={handleFilter} />
        <PaymentStatusFilter onStatusFilter={handleStatusFilter} />
        
        {error ? (
          <ErrorAlert 
            message="Failed to load travel requests. Please try again." 
            onRetry={refetch} 
          />
        ) : isLoading ? (
          <LoadingSpinner />
        ) : requests.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            No travel requests found matching your criteria.
          </div>
        ) : (
          <TravelRequestTable 
            requests={requests} 
            onPay={setActiveModalPayment}
          />
        )}
      </div>
    </>
  )
}

export default TravelRequestsPage