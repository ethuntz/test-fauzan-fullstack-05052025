import React from 'react'
import { FilterParams } from '../api/type'

interface PaymentStatusFilterProps {
  onStatusFilter: (status: FilterParams['status']) => void
}

const PaymentStatusFilter: React.FC<PaymentStatusFilterProps> = ({ onStatusFilter }) => {
  const [selectedStatus, setSelectedStatus] = React.useState<FilterParams['status']>()

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as FilterParams['status'] | ''
    const status = value === '' ? undefined : value
    setSelectedStatus(status)
    onStatusFilter(status)
  }

  return (
    <div className="mb-4">
      <label htmlFor="statusFilter" className="block text-sm font-medium text-gray-700 mb-1">
        Filter by Payment Status
      </label>
      <select
        id="statusFilter"
        value={selectedStatus || ''}
        onChange={handleChange}
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      >
        <option value="">All Statuses</option>
        <option value="pending">Pending</option>
        <option value="paid">Paid</option>
        <option value="failed">Failed</option>
      </select>
    </div>
  )
}

export default PaymentStatusFilter