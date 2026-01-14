import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUniversity, FaUpload, FaCheckCircle, FaTimes, FaImage } from 'react-icons/fa';
import Swal from 'sweetalert2';

const BankTransferPayment = ({ amount, onSuccess, onCancel }) => {
  const [transferNumber, setTransferNumber] = useState('');
  const [receiptImage, setReceiptImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const bankDetails = {
    bankName: 'البنك الأهلي التجاري',
    accountName: 'رند جرار  ',
    accountNumber: 'SA1234567890123456789012',
    iban: 'SA1234567890123456789012'
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // التحقق من نوع الملف
      if (!file.type.startsWith('image/')) {
        Swal.fire({
          title: 'خطأ',
          text: 'يرجى رفع صورة فقط',
          icon: 'error',
          confirmButtonText: 'حسناً',
          confirmButtonColor: '#E91E63'
        });
        return;
      }

      // التحقق من حجم الملف (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        Swal.fire({
          title: 'خطأ',
          text: 'حجم الصورة يجب أن يكون أقل من 5 ميجابايت',
          icon: 'error',
          confirmButtonText: 'حسناً',
          confirmButtonColor: '#E91E63'
        });
        return;
      }

      setReceiptImage(file);
      
      // إنشاء معاينة للصورة
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setReceiptImage(null);
    setImagePreview(null);
  };

  const handleSubmit = async () => {
    // التحقق من البيانات
    if (!transferNumber.trim()) {
      Swal.fire({
        title: 'تنبيه',
        text: 'يرجى إدخال رقم التحويل',
        icon: 'warning',
        confirmButtonText: 'حسناً',
        confirmButtonColor: '#E91E63'
      });
      return;
    }

    if (!receiptImage) {
      Swal.fire({
        title: 'تنبيه',
        text: 'يرجى رفع صورة الإيصال',
        icon: 'warning',
        confirmButtonText: 'حسناً',
        confirmButtonColor: '#E91E63'
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // في المستقبل: رفع البيانات إلى Laravel API
      // const formData = new FormData();
      // formData.append('transfer_number', transferNumber);
      // formData.append('receipt', receiptImage);
      // formData.append('amount', amount);
      
      // const response = await axios.post('/api/bank-transfer/submit', formData, {
      //   headers: { 'Content-Type': 'multipart/form-data' }
      // });

      // محاكاة عملية الرفع
      setTimeout(() => {
        setIsSubmitting(false);
        
        Swal.fire({
          title: 'تم الإرسال بنجاح! 🎉',
          html: `
            <p>تم استلام طلب التجديد الخاص بك</p>
            <p><strong>رقم التحويل:</strong> ${transferNumber}</p>
            <p style="color: #666; font-size: 0.9rem; margin-top: 1rem;">
              سيتم مراجعة الطلب والتحقق من التحويل خلال 24 ساعة
            </p>
          `,
          icon: 'success',
          confirmButtonText: 'رائع',
          confirmButtonColor: '#E91E63'
        });

        if (onSuccess) {
          onSuccess();
        }
      }, 2000);

    } catch (error) {
      setIsSubmitting(false);
      console.error('Bank transfer error:', error);
      
      Swal.fire({
        title: 'فشل الإرسال',
        text: 'حدث خطأ أثناء إرسال البيانات. يرجى المحاولة مرة أخرى',
        icon: 'error',
        confirmButtonText: 'حسناً',
        confirmButtonColor: '#E91E63'
      });
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    Swal.fire({
      title: 'تم النسخ!',
      text: 'تم نسخ النص إلى الحافظة',
      icon: 'success',
      timer: 1500,
      showConfirmButton: false,
      iconColor: '#E91E63'
    });
  };

  return (
    <div className="bank-transfer-payment">
      {/* Bank Details */}
      <div className="bank-details-card">
        <div className="card-header">
          <FaUniversity className="bank-icon" />
          <h3>معلومات الحساب البنكي</h3>
        </div>

        <div className="bank-info">
          <div className="info-row">
            <span className="label">اسم البنك:</span>
            <span className="value">{bankDetails.bankName}</span>
          </div>
          
          <div className="info-row">
            <span className="label">اسم الحساب:</span>
            <span className="value">{bankDetails.accountName}</span>
          </div>
          
          <div className="info-row clickable" onClick={() => copyToClipboard(bankDetails.iban)}>
            <span className="label">رقم الآيبان:</span>
            <span className="value copy-value">
              {bankDetails.iban}
              <span className="copy-hint">انقر للنسخ</span>
            </span>
          </div>

          <div className="amount-row">
            <span className="label">المبلغ المطلوب:</span>
            <span className="amount">${amount}</span>
          </div>
        </div>

        <div className="transfer-note">
          <FaCheckCircle />
          <p>بعد إتمام التحويل، يرجى رفع صورة الإيصال وإدخال رقم التحويل</p>
        </div>
      </div>

      {/* Upload Section */}
      <div className="upload-section">
        <h4>إثبات التحويل</h4>

        {/* Transfer Number */}
        <div className="form-group">
          <label>رقم التحويل *</label>
          <input
            type="text"
            value={transferNumber}
            onChange={(e) => setTransferNumber(e.target.value)}
            placeholder="أدخل رقم التحويل البنكي"
            className="transfer-input"
            disabled={isSubmitting}
          />
        </div>

        {/* Image Upload */}
        <div className="form-group">
          <label>صورة الإيصال *</label>
          
          {!imagePreview ? (
            <label className="upload-area">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={isSubmitting}
                hidden
              />
              <FaUpload className="upload-icon" />
              <span className="upload-text">اضغط لرفع صورة الإيصال</span>
              <span className="upload-hint">PNG, JPG, JPEG (حتى 5MB)</span>
            </label>
          ) : (
            <div className="image-preview-container">
              <div className="image-preview">
                <img src={imagePreview} alt="Receipt preview" />
                <button
                  className="remove-image"
                  onClick={handleRemoveImage}
                  disabled={isSubmitting}
                  type="button"
                >
                  <FaTimes />
                </button>
              </div>
              <div className="image-info">
                <FaImage />
                <span>{receiptImage?.name}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="action-buttons">
        <motion.button
          className="cancel-button"
          onClick={onCancel}
          disabled={isSubmitting}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          إلغاء
        </motion.button>

        <motion.button
          className="submit-button"
          onClick={handleSubmit}
          disabled={isSubmitting}
          whileHover={!isSubmitting ? { scale: 1.02 } : {}}
          whileTap={!isSubmitting ? { scale: 0.98 } : {}}
        >
          {isSubmitting ? (
            <>
              <div className="spinner"></div>
              <span>جاري الإرسال...</span>
            </>
          ) : (
            <>
              <FaCheckCircle />
              <span>إرسال الطلب</span>
            </>
          )}
        </motion.button>
      </div>
    </div>
  );
};

export default BankTransferPayment;