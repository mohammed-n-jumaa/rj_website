import { motion } from 'framer-motion';
import { FaUpload } from 'react-icons/fa';

const UploadReceiptCard = ({ delay }) => {
  return (
    <motion.div 
      className="upload-receipt-card"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
    >
      <div className="card-header">
        <h3>رفع إيصال الدفع</h3>
        <FaUpload className="header-icon" />
      </div>
      <div className="upload-area">
        <FaUpload className="upload-icon" />
        <p>اسحبي الإيصال هنا أو اضغطي للتحميل</p>
        <input type="file" accept="image/*,.pdf" />
        <motion.button
          className="upload-btn"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          اختيار ملف
        </motion.button>
      </div>
    </motion.div>
  );
};

export default UploadReceiptCard;