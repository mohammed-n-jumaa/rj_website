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
  FaCheckCircle
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

  // تهيئة البيانات عند فتح المودال
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
        goal: userData.goal || 'weight-loss',
        workoutPlace: userData.workoutPlace || 'home',
        healthNotes: userData.healthNotes || '',
        program: userData.program || ''
      });
      setAvatarPreview(userData.avatar || '');
      // إعادة تعيين الرسائل
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
    // إزالة الخطأ عند التعديل
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    // إزالة رسائل النجاح والخطأ
    setSuccessMessage('');
    setServerError('');
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, avatar: 'حجم الصورة يجب أن يكون أقل من 5MB' }));
        return;
      }

      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({ ...prev, avatar: 'الرجاء اختيار صورة صحيحة' }));
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

    // التحقق من الاسم
    if (!formData.name.trim()) {
      newErrors.name = 'الاسم مطلوب';
    } else if (formData.name.length < 2) {
      newErrors.name = 'الاسم يجب أن يكون على الأقل حرفين';
    }

    // التحقق من البريد الإلكتروني
    if (!formData.email.trim()) {
      newErrors.email = 'البريد الإلكتروني مطلوب';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'البريد الإلكتروني غير صالح';
    }

    // التحقق من كلمة المرور
    if (formData.password) {
      if (formData.password.length < 6) {
        newErrors.password = 'كلمة المرور يجب أن تكون 6 أحرف على الأقل';
      } else if (!/(?=.*[a-zA-Z])(?=.*\d)/.test(formData.password)) {
        newErrors.password = 'كلمة المرور يجب أن تحتوي على أحرف وأرقام';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'كلمة المرور غير متطابقة';
      }
    }

    // التحقق من القياسات
    if (!formData.height) {
      newErrors.height = 'الطول مطلوب';
    } else if (parseFloat(formData.height) < 100 || parseFloat(formData.height) > 250) {
      newErrors.height = 'الطول يجب أن يكون بين 100 و 250 سم';
    }

    if (!formData.weight) {
      newErrors.weight = 'الوزن مطلوب';
    } else if (parseFloat(formData.weight) < 30 || parseFloat(formData.weight) > 300) {
      newErrors.weight = 'الوزن يجب أن يكون بين 30 و 300 كجم';
    }

    if (formData.waist && (parseFloat(formData.waist) < 50 || parseFloat(formData.waist) > 200)) {
      newErrors.waist = 'قياس الخصر يجب أن يكون بين 50 و 200 سم';
    }

    if (formData.hips && (parseFloat(formData.hips) < 50 || parseFloat(formData.hips) > 200)) {
      newErrors.hips = 'قياس الأرداف يجب أن يكون بين 50 و 200 سم';
    }

    if (!formData.age) {
      newErrors.age = 'العمر مطلوب';
    } else if (parseInt(formData.age) < 10 || parseInt(formData.age) > 100) {
      newErrors.age = 'العمر يجب أن يكون بين 10 و 100 سنة';
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
    setServerError(''); // إعادة تعيين أي أخطاء سابقة

    try {
      // إعداد بيانات المستخدم المحدثة
      const updatedUser = {
        ...userData,
        name: formData.name.trim(),
        email: formData.email.trim(),
        avatar: formData.avatar,
        height: parseFloat(formData.height),
        weight: parseFloat(formData.weight),
        waist: formData.waist ? parseFloat(formData.waist) : null,
        hips: formData.hips ? parseFloat(formData.hips) : null,
        age: parseInt(formData.age),
        goal: formData.goal,
        workoutPlace: formData.workoutPlace,
        healthNotes: formData.healthNotes.trim(),
        program: formData.program.trim()
      };

      // إذا تم تغيير كلمة المرور
      if (formData.password) {
        updatedUser.password = formData.password;
      }

      // محاكاة طلب API
      await new Promise(resolve => setTimeout(resolve, 1500));

      // حفظ البيانات
      await onSave(updatedUser);

      // عرض رسالة النجاح باستخدام SweetAlert
      Swal.fire({
        title: 'تم بنجاح!',
        text: 'تم تحديث البروفايل بنجاح',
        icon: 'success',
        confirmButtonText: 'حسناً',
        confirmButtonColor: '#FDB813',
        timer: 3000,
        timerProgressBar: true,
        didClose: () => {
          onClose();
        }
      });

    } catch (error) {
      // عرض الخطأ في المودال نفسه
      setServerError(error.message || 'حدث خطأ أثناء حفظ التغييرات. الرجاء المحاولة مرة أخرى.');
      
      // عرض رسالة SweetAlert للخطأ
      Swal.fire({
        title: 'خطأ!',
        text: 'فشل في تحديث البروفايل',
        icon: 'error',
        confirmButtonText: 'حاول مرة أخرى',
        confirmButtonColor: '#dc2626'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const goals = [
    { value: 'weight-loss', label: 'خسارة وزن' },
    { value: 'muscle-gain', label: 'بناء عضل' },
    { value: 'toning', label: 'تنشيف' },
    { value: 'fitness', label: 'لياقة عامة' }
  ];

  const workoutPlaces = [
    { value: 'home', label: 'بيت' },
    { value: 'gym', label: 'جيم' }
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
          {/* رأس المودال */}
          <div className="modal-header">
            <h2>تعديل البروفايل</h2>
            <button className="close-btn" onClick={onClose}>
              <FaTimes />
            </button>
          </div>

          {/* محتوى المودال */}
          <div className="modal-content">
            <form onSubmit={handleSubmit}>
              {/* رسالة النجاح */}
              {successMessage && (
                <div className="success-message">
                  <FaCheckCircle />
                  <span>{successMessage}</span>
                </div>
              )}

              {/* خطأ الخادم */}
              {serverError && (
                <div className="server-error">
                  <FaExclamationCircle />
                  <span>{serverError}</span>
                </div>
              )}

              {/* قسم الصورة الشخصية */}
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

              {/* قسم المعلومات الأساسية */}
              <div className="form-section">
                <h3>المعلومات الأساسية</h3>
                
                <div className="form-grid">
                  {/* الاسم */}
                  <div className="form-group">
                    <label>
                      <FaUser /> الاسم الكامل
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={errors.name ? 'error' : ''}
                      placeholder="أدخل اسمك الكامل"
                      maxLength="50"
                    />
                    {errors.name && <p className="error-message">{errors.name}</p>}
                  </div>

                  {/* البريد الإلكتروني */}
                  <div className="form-group">
                    <label>
                      <FaEnvelope /> البريد الإلكتروني
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

                  {/* كلمة المرور */}
                  <div className="form-group">
                    <label>
                      <FaLock /> كلمة المرور الجديدة (اختياري)
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className={errors.password ? 'error' : ''}
                      placeholder="أدخل كلمة مرور جديدة (6 أحرف على الأقل)"
                    />
                    {errors.password && <p className="error-message">{errors.password}</p>}
                  </div>

                  {/* تأكيد كلمة المرور */}
                  <div className="form-group">
                    <label>
                      <FaLock /> تأكيد كلمة المرور
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className={errors.confirmPassword ? 'error' : ''}
                      placeholder="أعد إدخال كلمة المرور"
                    />
                    {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
                  </div>
                </div>
              </div>

              {/* قسم القياسات البدنية */}
              <div className="form-section">
                <h3>القياسات البدنية</h3>
                
                <div className="form-grid">
                  {/* الطول */}
                  <div className="form-group">
                    <label>
                      <FaRuler /> الطول (سم)
                    </label>
                    <input
                      type="number"
                      name="height"
                      value={formData.height}
                      onChange={handleInputChange}
                      className={errors.height ? 'error' : ''}
                      placeholder="مثال: 170"
                      min="100"
                      max="250"
                      step="0.1"
                    />
                    {errors.height && <p className="error-message">{errors.height}</p>}
                  </div>

                  {/* الوزن */}
                  <div className="form-group">
                    <label>
                      <FaWeight /> الوزن الحالي (كجم)
                    </label>
                    <input
                      type="number"
                      name="weight"
                      value={formData.weight}
                      onChange={handleInputChange}
                      className={errors.weight ? 'error' : ''}
                      placeholder="مثال: 75"
                      min="30"
                      max="300"
                      step="0.1"
                    />
                    {errors.weight && <p className="error-message">{errors.weight}</p>}
                  </div>

                  {/* قياس الخصر */}
                  <div className="form-group">
                    <label>قياس الخصر (سم)</label>
                    <input
                      type="number"
                      name="waist"
                      value={formData.waist}
                      onChange={handleInputChange}
                      className={errors.waist ? 'error' : ''}
                      placeholder="قياس من عند السرة"
                      min="50"
                      max="200"
                      step="0.1"
                    />
                    {errors.waist && <p className="error-message">{errors.waist}</p>}
                  </div>

                  {/* قياس الأرداف */}
                  <div className="form-group">
                    <label>قياس الأرداف (للسيدات)</label>
                    <input
                      type="number"
                      name="hips"
                      value={formData.hips}
                      onChange={handleInputChange}
                      className={errors.hips ? 'error' : ''}
                      placeholder="قياس الأرداف"
                      min="50"
                      max="200"
                      step="0.1"
                    />
                    {errors.hips && <p className="error-message">{errors.hips}</p>}
                  </div>

                  {/* العمر */}
                  <div className="form-group">
                    <label>العمر (سنوات)</label>
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleInputChange}
                      className={errors.age ? 'error' : ''}
                      placeholder="مثال: 25"
                      min="10"
                      max="100"
                    />
                    {errors.age && <p className="error-message">{errors.age}</p>}
                  </div>
                </div>
              </div>

              {/* قسم الهدف والنشاط */}
              <div className="form-section">
                <h3>الهدف والنشاط</h3>
                
                <div className="form-grid">
                  {/* الهدف */}
                  <div className="form-group">
                    <label>
                      <FaBullseye /> هدفك؟
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

                  {/* مكان التمرين */}
                  <div className="form-group">
                    <label>
                      <FaHome /> مكان التمرين؟
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

                  {/* البرنامج */}
                  <div className="form-group">
                    <label>البرنامج المختار</label>
                    <input
                      type="text"
                      name="program"
                      value={formData.program}
                      onChange={handleInputChange}
                      placeholder="اسم البرنامج"
                      maxLength="100"
                    />
                  </div>
                </div>
              </div>

              {/* قسم الحالة الصحية */}
              <div className="form-section">
                <h3>الحالة الصحية</h3>
                
                <div className="form-group">
                  <label>
                    <FaHeartbeat /> هل توجد إصابات أو حساسية طعام؟
                  </label>
                  <textarea
                    name="healthNotes"
                    value={formData.healthNotes}
                    onChange={handleInputChange}
                    placeholder="أدخل أي ملاحظات صحية (إصابات، حساسية، أدوية، إلخ...)"
                    rows="3"
                    className="textarea-input"
                    maxLength="500"
                  />
                  <div className="char-count">
                    {formData.healthNotes.length}/500 حرف
                  </div>
                </div>
              </div>

              {/* أزرار الإجراءات */}
              <div className="modal-actions">
                <button 
                  type="button" 
                  className="cancel-btn"
                  onClick={onClose}
                  disabled={isSubmitting}
                >
                  إلغاء
                </button>
                <button 
                  type="submit" 
                  className="save-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner"></span>
                      جاري الحفظ...
                    </>
                  ) : (
                    <>
                      <FaSave />
                      حفظ التغييرات
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