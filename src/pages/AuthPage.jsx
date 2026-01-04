import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Auth from '../components/Auth/Auth';

const AuthPage = () => {
  const navigate = useNavigate();
  const [isOpen] = useState(true);

  const handleClose = () => {
    navigate('/');
  };

  return <Auth isOpen={isOpen} onClose={handleClose} />;
};

export default AuthPage;