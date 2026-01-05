import PaymentStatusCard from './PaymentStatusCard';
import SubscriptionTimeline from './SubscriptionTimeline';
import UploadReceiptCard from './UploadReceiptCard';
import RenewalCard from './RenewalCard';

const PaymentGrid = ({ userData }) => {
  return (
    <div className="payment-grid">
      <PaymentStatusCard userData={userData} delay={0.1} />
      <SubscriptionTimeline userData={userData} delay={0.2} />
      <UploadReceiptCard delay={0.3} />
      <RenewalCard userData={userData} delay={0.4} />
    </div>
  );
};

export default PaymentGrid;