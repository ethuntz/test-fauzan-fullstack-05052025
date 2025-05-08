import { request } from 'http'
import { TravelRequest } from '../api/type'
import PaymentStatusBadge from './PaymentStatusBadge'

interface TravelRequestTableProps {
  requests: TravelRequest[]
  onPay: (request: TravelRequest) => void;
}


const TravelRequestTable: React.FC<TravelRequestTableProps> = ({
  requests,
  onPay,
}) => {

  return (
    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6">
                Name
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6">
                Dates
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6">
                Destination
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6">
                Amount
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6">
                Status
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {requests.map((request) => (
              <tr key={request.id}>
                <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900 sm:px-6">
                  {request.name}
                </td>
                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500 sm:px-6">
                  {request.departure_date} to {request.arrival_date}
                </td>
                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500 sm:px-6">
                  {request.destination}
                </td>
                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500 sm:px-6">
                  {request.payments[0]?.amount?.toLocaleString()}
                </td>
                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500 sm:px-6">
                  <PaymentStatusBadge status={request.payments[0]?.status} />
                </td>
                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500 sm:px-6">
                  <button
                    onClick={() => {
                        onPay(request)
                    }}
                    disabled={request.payments[0]?.status === 'pending' }
                    className={`px-3 py-1 rounded-md text-sm font-medium ${
                      !request.payments[0]?.status
                        ? 'bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-wait'
                        : ''
                    }`}
                  >
                    { !request.payments[0]?.status ? (
                        'Pay Now'
                      ) : (
                      ''
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TravelRequestTable