import { useState, useEffect } from 'react';
import Login from '../components/Auth/Login';
import Register from '../components/Auth/Register';


const AuthPage = ({ isOpen, onClose, initialMode = 'login' }) => {
  const [mode, setMode] = useState(initialMode);

  // تحديث الوضع عند تغير initialMode من الخارج
  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  const handleSwitchToRegister = () => setMode('register');
  const handleSwitchToLogin = () => setMode('login');

  if (mode === 'register') {
    return <Register isOpen={isOpen} onClose={onClose} switchToLogin={handleSwitchToLogin} />;
  }

  return <Login isOpen={isOpen} onClose={onClose} switchToRegister={handleSwitchToRegister} />;
};

export default AuthPage;
