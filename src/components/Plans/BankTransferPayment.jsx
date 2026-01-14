import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUniversity, FaUpload, FaCheckCircle, FaTimes, FaImage } from 'react-icons/fa';
import Swal from 'sweetalert2';

const BankTransferPayment = ({ amount, planName, onSuccess, onCancel }) => {
  const [transferNumber, setTransferNumber] = useState('');
  const [receiptImage, setReceiptImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const bankDetails = {
    bankName: 'National Commercial Bank',
    accountName: 'Rand Jarar',
    accountNumber: 'SA1234567890123456789012',
    iban: 'SA1234567890123456789012'
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file type
      if (!file.type.startsWith('image/')) {
        Swal.fire({
          title: 'Error',
          text: 'Please upload an image only',
          icon: 'error',
          confirmButtonText: 'OK',
          confirmButtonColor: '#E91E63'
        });
        return;
      }

      // Check file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        Swal.fire({
          title: 'Error',
          text: 'Image size must be less than 5MB',
          icon: 'error',
          confirmButtonText: 'OK',
          confirmButtonColor: '#E91E63'
        });
        return;
      }

      setReceiptImage(file);
      
      // Create image preview
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
    // Validate data
    if (!transferNumber.trim()) {
      Swal.fire({
        title: 'Warning',
        text: 'Please enter the transfer number',
        icon: 'warning',
        confirmButtonText: 'OK',
        confirmButtonColor: '#E91E63'
      });
      return;
    }

    if (!receiptImage) {
      Swal.fire({
        title: 'Warning',
        text: 'Please upload the receipt image',
        icon: 'warning',
        confirmButtonText: 'OK',
        confirmButtonColor: '#E91E63'
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Future: Upload data to Laravel API
      // const formData = new FormData();
      // formData.append('transfer_number', transferNumber);
      // formData.append('receipt', receiptImage);
      // formData.append('amount', amount);
      // formData.append('plan_name', planName);
      
      // const response = await axios.post('/api/subscriptions/bank-transfer', formData, {
      //   headers: { 'Content-Type': 'multipart/form-data' }
      // });

      // Simulate upload process
      setTimeout(() => {
        setIsSubmitting(false);
        
        if (onSuccess) {
          onSuccess();
        }
      }, 2000);

    } catch (error) {
      setIsSubmitting(false);
      console.error('Bank transfer error:', error);
      
      Swal.fire({
        title: 'Submission Failed',
        text: 'An error occurred while sending data. Please try again',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#E91E63'
      });
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    Swal.fire({
      title: 'Copied!',
      text: 'Text copied to clipboard',
      icon: 'success',
      timer: 1500,
      showConfirmButton: false,
      iconColor: '#E91E63'
    });
  };

  return (
    <div className="bank-transfer-payment plans-version">
      {/* Bank Details */}
      <div className="bank-details-card">
        <div className="card-header">
          <FaUniversity className="bank-icon" />
          <h3>Bank Account Information</h3>
        </div>

        <div className="bank-info">
          <div className="info-row">
            <span className="label">Bank Name:</span>
            <span className="value">{bankDetails.bankName}</span>
          </div>
          
          <div className="info-row">
            <span className="label">Account Name:</span>
            <span className="value">{bankDetails.accountName}</span>
          </div>
          
          <div className="info-row clickable" onClick={() => copyToClipboard(bankDetails.iban)}>
            <span className="label">IBAN Number:</span>
            <span className="value copy-value">
              {bankDetails.iban}
              <span className="copy-hint">Click to copy</span>
            </span>
          </div>

          <div className="amount-row">
            <span className="label">Required Amount:</span>
            <span className="amount">${amount}</span>
          </div>
          
          <div className="plan-row">
            <span className="label">Plan:</span>
            <span className="value">{planName}</span>
          </div>
        </div>

        <div className="transfer-note">
          <FaCheckCircle />
          <p>After completing the transfer, please upload the receipt image and enter the transfer number</p>
        </div>
      </div>

      {/* Upload Section */}
      <div className="upload-section">
        <h4>Transfer Proof</h4>

        {/* Transfer Number */}
        <div className="form-group">
          <label>Transfer Number *</label>
          <input
            type="text"
            value={transferNumber}
            onChange={(e) => setTransferNumber(e.target.value)}
            placeholder="Enter bank transfer number"
            className="transfer-input"
            disabled={isSubmitting}
          />
        </div>

        {/* Image Upload */}
        <div className="form-group">
          <label>Receipt Image *</label>
          
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
              <span className="upload-text">Click to upload receipt image</span>
              <span className="upload-hint">PNG, JPG, JPEG (up to 5MB)</span>
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
          Back
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
              <span>Sending...</span>
            </>
          ) : (
            <>
              <FaCheckCircle />
              <span>Submit Request</span>
            </>
          )}
        </motion.button>
      </div>
    </div>
  );
};

export default BankTransferPayment;