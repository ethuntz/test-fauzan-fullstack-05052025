import React from 'react'
import { FilterParams } from '../api/type'

interface FilterFormProps {
  onFilter: (filters: FilterParams) => void
}

const FilterForm: React.FC<FilterFormProps> = ({ onFilter }) => {
  const [name, setName] = React.useState('')
  const [departure_date, setDepartureDate] = React.useState('')
  const [arrival_date, setArrivalDate] = React.useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onFilter({
      name: name || undefined,
      departure_date: departure_date || undefined,
      arrival_date: arrival_date || undefined
    })
  }

  const handleReset = () => {
    setName('')
    setArrivalDate('')
    setDepartureDate('')
    onFilter({
        name: undefined,
        departure_date: undefined,
        arrival_date: undefined
      })
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6 p-4 bg-white rounded-lg shadow">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="employeeName" className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            id="employeeName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        
        <div>
          <label htmlFor="deparutreDate" className="block text-sm font-medium text-gray-700 mb-1">
            Departure Date
          </label>
          <input
            type="date"
            id="deparutreDate"
            value={departure_date}
            onChange={(e) => setDepartureDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        
        <div>
          <label htmlFor="arrivalDate" className="block text-sm font-medium text-gray-700 mb-1">
            Arrival Date
          </label>
          <input
            type="date"
            id="arrivalDate"
            value={arrival_date}
            onChange={(e) => setArrivalDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      </div>
      
      <div className="mt-4 flex justify-end space-x-3">
        <button
          type="button"
          onClick={handleReset}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Reset
        </button>
        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Filter
        </button>
      </div>
    </form>
  )
}

export default FilterForm