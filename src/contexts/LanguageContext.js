import { createContext, useState, useContext, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  // الحصول على اللغة من localStorage أو استخدام العربية كافتراضي
  const [currentLang, setCurrentLang] = useState(() => {
    return localStorage.getItem('language') || 'ar';
  });

  const [isLoading, setIsLoading] = useState(false);

  // تغيير اللغة
  const changeLanguage = async (newLang) => {
    setIsLoading(true);
    
    try {
      // في المستقبل: إرسال طلب للـ Laravel API
      // const response = await axios.post('/api/change-language', { 
      //   language: newLang 
      // });
      
      // حفظ اللغة في localStorage
      localStorage.setItem('language', newLang);
      setCurrentLang(newLang);
      
      // تغيير اتجاه الصفحة
      document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = newLang;
      
      // إعادة تحميل المحتوى الديناميكي (في المستقبل)
      // await fetchDynamicContent(newLang);
      
      console.log(`Language changed to: ${newLang}`);
    } catch (error) {
      console.error('Error changing language:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // تطبيق اللغة عند التحميل
  useEffect(() => {
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLang;
  }, [currentLang]);

  const value = {
    currentLang,
    changeLanguage,
    isLoading,
    isArabic: currentLang === 'ar',
    isEnglish: currentLang === 'en'
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContext;