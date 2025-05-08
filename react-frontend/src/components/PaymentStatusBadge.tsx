import { TravelRequest } from '../api/type'

interface PaymentStatusBadgeProps {
  status: TravelRequest['payments'][0]['status']
}

const PaymentStatusBadge: React.FC<PaymentStatusBadgeProps> = ({ status }) => {
let status_badge = ''; 
  const statusClasses = {
    warning: 'bg-yellow-100 text-yellow-800',
    success: 'bg-green-100 text-green-800',
    error: 'bg-red-100 text-red-800',
  }
  if(status === 'pending') status_badge = statusClasses['warning'];
  if(status === 'paid') status_badge = statusClasses['success'];
  if(status === 'failed') status_badge = statusClasses['error'];

  
  return (
    <span className={`px-2 py-1 text-xs font-medium rounded-full ${status_badge}`}>
      {status ? (status.charAt(0).toUpperCase() + status?.slice(1)) : ''}
    </span>
  )
}

export default PaymentStatusBadge