import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Swal from 'sweetalert2';
import { 
  FaTimes, 
  FaUser, 
  FaEnvelope, 
  FaLock, 
  FaCamera, 
  FaRuler, 
  FaWeight, 
  FaHeartbeat,
  FaBullseye,
  FaHome,
  FaSave,
  FaExclamationCircle,
  FaCheckCircle,
  FaVenusMars,
  FaVenus,
  FaMars
} from 'react-icons/fa';
import './EditProfileModal.scss';

const EditProfileModal = ({ isOpen, onClose, userData, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    avatar: '',
    height: '',
    weight: '',
    waist: '',
    hips: '',
    age: '',
    gender: 'male', // إضافة حقل الجنس
    goal: '',
    workoutPlace: '',
    healthNotes: '',
    program: ''
  });

  const [avatarPreview, setAvatarPreview] = useState('');
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [serverError, setServerError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize data when modal opens
  useEffect(() => {
    if (isOpen && userData) {
      setFormData({
        name: userData.name || '',
        email: userData.email || '',
        password: '',
        confirmPassword: '',
        avatar: userData.avatar || '',
        height: userData.height?.toString() || '',
        weight: userData.weight?.toString() || '',
        waist: userData.waist?.toString() || '',
        hips: userData.hips?.toString() || '',
        age: userData.age?.toString() || '',
        gender: userData.gender || 'male', // تعيين الجنس
        goal: userData.goal || 'weight-loss',
        workoutPlace: userData.workoutPlace || 'home',
        healthNotes: userData.healthNotes || '',
        program: userData.program || ''
      });
      setAvatarPreview(userData.avatar || '');
      // Reset messages
      setErrors({});
      setSuccessMessage('');
      setServerError('');
    }
  }, [isOpen, userData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    // Clear success and server error messages
    setSuccessMessage('');
    setServerError('');
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, avatar: 'Image size must be less than 5MB' }));
        return;
      }

      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({ ...prev, avatar: 'Please select a valid image file' }));
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
        setFormData(prev => ({
          ...prev,
          avatar: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Validate password
    if (formData.password) {
      if (formData.password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters';
      } else if (!/(?=.*[a-zA-Z])(?=.*\d)/.test(formData.password)) {
        newErrors.password = 'Password must contain letters and numbers';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    // Validate measurements
    if (!formData.height) {
      newErrors.height = 'Height is required';
    } else if (parseFloat(formData.height) < 100 || parseFloat(formData.height) > 250) {
      newErrors.height = 'Height must be between 100 and 250 cm';
    }

    if (!formData.weight) {
      newErrors.weight = 'Weight is required';
    } else if (parseFloat(formData.weight) < 30 || parseFloat(formData.weight) > 300) {
      newErrors.weight = 'Weight must be between 30 and 300 kg';
    }

    // Waist measurement is required for both genders
    if (!formData.waist) {
      newErrors.waist = 'Waist measurement is required';
    } else if (parseFloat(formData.waist) < 50 || parseFloat(formData.waist) > 200) {
      newErrors.waist = 'Waist measurement must be between 50 and 200 cm';
    }

    // Hips measurement is only required for females
    if (formData.gender === 'female' && !formData.hips) {
      newErrors.hips = 'Hips measurement is required for females';
    } else if (formData.hips && (parseFloat(formData.hips) < 50 || parseFloat(formData.hips) > 200)) {
      newErrors.hips = 'Hips measurement must be between 50 and 200 cm';
    }

    if (!formData.age) {
      newErrors.age = 'Age is required';
    } else if (parseInt(formData.age) < 10 || parseInt(formData.age) > 100) {
      newErrors.age = 'Age must be between 10 and 100 years';
    }

    if (!formData.gender) {
      newErrors.gender = 'Gender is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setServerError(''); // Reset any previous errors

    try {
      // Prepare updated user data
      const updatedUser = {
        ...userData,
        name: formData.name.trim(),
        email: formData.email.trim(),
        avatar: formData.avatar,
        height: parseFloat(formData.height),
        weight: parseFloat(formData.weight),
        waist: parseFloat(formData.waist),
        hips: formData.hips ? parseFloat(formData.hips) : null,
        age: parseInt(formData.age),
        gender: formData.gender, // إضافة الجنس
        goal: formData.goal,
        workoutPlace: formData.workoutPlace,
        healthNotes: formData.healthNotes.trim(),
        program: formData.program.trim()
      };

      // If password was changed
      if (formData.password) {
        updatedUser.password = formData.password;
      }

      // Simulate API request
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Save data
      await onSave(updatedUser);

      // Show success message with SweetAlert
      Swal.fire({
        title: 'Success!',
        text: 'Profile updated successfully',
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: '#FDB813',
        timer: 3000,
        timerProgressBar: true,
        didClose: () => {
          onClose();
        }
      });

    } catch (error) {
      // Show error in the modal itself
      setServerError(error.message || 'Failed to save changes. Please try again.');
      
      // Show SweetAlert for error
      Swal.fire({
        title: 'Error!',
        text: 'Failed to update profile',
        icon: 'error',
        confirmButtonText: 'Try Again',
        confirmButtonColor: '#dc2626'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const genders = [
    { value: 'male', label: 'Male', icon: <FaMars /> },
    { value: 'female', label: 'Female', icon: <FaVenus /> }
  ];

  const goals = [
    { value: 'weight-loss', label: 'Weight Loss' },
    { value: 'muscle-gain', label: 'Muscle Gain' },
    { value: 'toning', label: 'Toning' },
    { value: 'fitness', label: 'General Fitness' }
  ];

  const workoutPlaces = [
    { value: 'home', label: 'Home' },
    { value: 'gym', label: 'Gym' }
  ];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="modal-overlay" onClick={onClose}>
        <motion.div 
          className="edit-profile-modal"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div className="modal-header">
            <h2>Edit Profile</h2>
            <button className="close-btn" onClick={onClose}>
              <FaTimes />
            </button>
          </div>

          {/* Modal Content */}
          <div className="modal-content">
            <form onSubmit={handleSubmit}>
              {/* Success Message */}
              {successMessage && (
                <div className="success-message">
                  <FaCheckCircle />
                  <span>{successMessage}</span>
                </div>
              )}

              {/* Server Error */}
              {serverError && (
                <div className="server-error">
                  <FaExclamationCircle />
                  <span>{serverError}</span>
                </div>
              )}

              {/* Avatar Section */}
              <div className="avatar-section">
                <div className="avatar-upload">
                  <div className="avatar-preview">
                    <img 
                      src={avatarPreview || '/default-avatar.png'} 
                      alt="Avatar Preview" 
                      className="avatar-img"
                    />
                    <label htmlFor="avatar-upload" className="avatar-upload-label">
                      <FaCamera />
                    </label>
                  </div>
                  <input
                    type="file"
                    id="avatar-upload"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="avatar-input"
                  />
                </div>
                {errors.avatar && <p className="error-message">{errors.avatar}</p>}
              </div>

              {/* Basic Information Section */}
              <div className="form-section">
                <h3>Basic Information</h3>
                
                <div className="form-grid">
                  {/* Name */}
                  <div className="form-group">
                    <label>
                      <FaUser /> Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={errors.name ? 'error' : ''}
                      placeholder="Enter your full name"
                      maxLength="50"
                    />
                    {errors.name && <p className="error-message">{errors.name}</p>}
                  </div>

                  {/* Email */}
                  <div className="form-group">
                    <label>
                      <FaEnvelope /> Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={errors.email ? 'error' : ''}
                      placeholder="example@email.com"
                    />
                    {errors.email && <p className="error-message">{errors.email}</p>}
                  </div>

                  {/* Gender */}
                  <div className="form-group">
                    <label>
                      <FaVenusMars /> Gender
                    </label>
                    <div className="gender-radio-group">
                      {genders.map(gender => (
                        <label key={gender.value} className="gender-radio-label">
                          <input
                            type="radio"
                            name="gender"
                            value={gender.value}
                            checked={formData.gender === gender.value}
                            onChange={handleInputChange}
                          />
                          <span className="gender-radio-custom">
                            {gender.icon}
                          </span>
                          <span className="gender-label">{gender.label}</span>
                        </label>
                      ))}
                    </div>
                    {errors.gender && <p className="error-message">{errors.gender}</p>}
                  </div>

                  {/* Age */}
                  <div className="form-group">
                    <label>Age (years)</label>
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleInputChange}
                      className={errors.age ? 'error' : ''}
                      placeholder="e.g., 25"
                      min="10"
                      max="100"
                    />
                    {errors.age && <p className="error-message">{errors.age}</p>}
                  </div>
                </div>
              </div>

              {/* Password Section */}
              <div className="form-section">
                <h3>Password Settings</h3>
                
                <div className="form-grid">
                  {/* Password */}
                  <div className="form-group">
                    <label>
                      <FaLock /> New Password (Optional)
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className={errors.password ? 'error' : ''}
                      placeholder="Enter new password (min 6 characters)"
                    />
                    {errors.password && <p className="error-message">{errors.password}</p>}
                  </div>

                  {/* Confirm Password */}
                  <div className="form-group">
                    <label>
                      <FaLock /> Confirm Password
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className={errors.confirmPassword ? 'error' : ''}
                      placeholder="Re-enter password"
                    />
                    {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
                  </div>
                </div>
              </div>

              {/* Body Measurements Section */}
              <div className="form-section">
                <h3>Body Measurements</h3>
                
                <div className="form-grid">
                  {/* Height */}
                  <div className="form-group">
                    <label>
                      <FaRuler /> Height (cm)
                    </label>
                    <input
                      type="number"
                      name="height"
                      value={formData.height}
                      onChange={handleInputChange}
                      className={errors.height ? 'error' : ''}
                      placeholder="e.g., 170"
                      min="100"
                      max="250"
                      step="0.1"
                    />
                    {errors.height && <p className="error-message">{errors.height}</p>}
                  </div>

                  {/* Weight */}
                  <div className="form-group">
                    <label>
                      <FaWeight /> Current Weight (kg)
                    </label>
                    <input
                      type="number"
                      name="weight"
                      value={formData.weight}
                      onChange={handleInputChange}
                      className={errors.weight ? 'error' : ''}
                      placeholder="e.g., 75"
                      min="30"
                      max="300"
                      step="0.1"
                    />
                    {errors.weight && <p className="error-message">{errors.weight}</p>}
                  </div>

                  {/* Waist */}
                  <div className="form-group">
                    <label>Waist Measurement (cm) *</label>
                    <input
                      type="number"
                      name="waist"
                      value={formData.waist}
                      onChange={handleInputChange}
                      className={errors.waist ? 'error' : ''}
                      placeholder="Measurement at navel"
                      min="50"
                      max="200"
                      step="0.1"
                    />
                    <small className="field-note">Required for all genders</small>
                    {errors.waist && <p className="error-message">{errors.waist}</p>}
                  </div>

                  {/* Hips - Only for females */}
                  <div className="form-group">
                    <label>
                      Hips Measurement (cm) {formData.gender === 'female' && '*'}
                    </label>
                    <input
                      type="number"
                      name="hips"
                      value={formData.hips}
                      onChange={handleInputChange}
                      className={errors.hips ? 'error' : ''}
                      placeholder="Hips measurement"
                      min="50"
                      max="200"
                      step="0.1"
                      disabled={formData.gender !== 'female'}
                    />
                    <small className="field-note">
                      {formData.gender === 'female' 
                        ? 'Required for females' 
                        : 'Only for females'}
                    </small>
                    {errors.hips && <p className="error-message">{errors.hips}</p>}
                  </div>
                </div>
              </div>

              {/* Goal & Activity Section */}
              <div className="form-section">
                <h3>Goal & Activity</h3>
                
                <div className="form-grid">
                  {/* Goal */}
                  <div className="form-group">
                    <label>
                      <FaBullseye /> Your Goal?
                    </label>
                    <select
                      name="goal"
                      value={formData.goal}
                      onChange={handleInputChange}
                      className="select-input"
                    >
                      {goals.map(goal => (
                        <option key={goal.value} value={goal.value}>
                          {goal.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Workout Place */}
                  <div className="form-group">
                    <label>
                      <FaHome /> Workout Place?
                    </label>
                    <div className="radio-group">
                      {workoutPlaces.map(place => (
                        <label key={place.value} className="radio-label">
                          <input
                            type="radio"
                            name="workoutPlace"
                            value={place.value}
                            checked={formData.workoutPlace === place.value}
                            onChange={handleInputChange}
                          />
                          <span className="radio-custom"></span>
                          {place.label}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Program */}
                  <div className="form-group">
                    <label>Selected Program</label>
                    <input
                      type="text"
                      name="program"
                      value={formData.program}
                      onChange={handleInputChange}
                      placeholder="Program name"
                      maxLength="100"
                    />
                  </div>
                </div>
              </div>

              {/* Health Status Section */}
              <div className="form-section">
                <h3>Health Status</h3>
                
                <div className="form-group">
                  <label>
                    <FaHeartbeat /> Any injuries or food allergies?
                  </label>
                  <textarea
                    name="healthNotes"
                    value={formData.healthNotes}
                    onChange={handleInputChange}
                    placeholder="Enter any health notes (injuries, allergies, medications, etc...)"
                    rows="3"
                    className="textarea-input"
                    maxLength="500"
                  />
                  <div className="char-count">
                    {formData.healthNotes.length}/500 characters
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="modal-actions">
                <button 
                  type="button" 
                  className="cancel-btn"
                  onClick={onClose}
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="save-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner"></span>
                      Saving...
                    </>
                  ) : (
                    <>
                      <FaSave />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default EditProfileModal;