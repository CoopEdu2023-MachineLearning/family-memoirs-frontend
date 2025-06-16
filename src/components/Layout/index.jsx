import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '@components/Header/index.jsx';
import LoginComponents from '@components/LoginComponents/index.jsx';
import SignUp from '@components/SignUp/index.jsx';
import styles from './index.module.scss';

const Layout = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authState, setAuthState] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleAuthButtonClick = () => {
    if (isLoggedIn) {
      setAuthState('me');
    } else {
      setAuthState('login');
    }
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setAuthState('');
  };

  return (
    <>
      <Header
        onAuthButtonClick={handleAuthButtonClick}
        isLoggedIn={isLoggedIn}
      />

      <div className={styles.bodyContainer}>
        <Outlet />
      </div>

      {authState === 'login' &&
        <LoginComponents
          onSwitchToSignup={() => setAuthState('signup')}
          onClose={() => setAuthState('')}
          onLoginSuccess={handleLoginSuccess}
        />
      }

      {authState === 'signup' &&
        <SignUp
          onSwitchToLogin={() => setAuthState('login')}
          onClose={() => setAuthState('')}
        />
      }
    </>
  );
};

export default Layout;