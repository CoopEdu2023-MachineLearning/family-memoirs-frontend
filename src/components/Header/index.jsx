import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './index.module.scss';

const Header = ({ onAuthButtonClick, isLoggedIn }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMyPage = location.pathname === '/my';

  const handleMyClick = () => {
    if (isLoggedIn) {
      navigate('/my');
    } else {
      if (onAuthButtonClick) {
        onAuthButtonClick();
      }
    }
  };

  const handleLogoClick = () => {
    navigate('/home');
  };

  return (
    <div className={isMyPage ? styles.headerMyPage : styles.header}>
      <img 
        src='/logo.svg' 
        alt="logo" 
        className={isMyPage ? styles.logoSmall : styles.logo}
        onClick={handleLogoClick}
        style={{ cursor: 'pointer' }}
      />
      <div className={styles.topBar}>
        <div>购买实体专辑</div>
        <div>关于我们</div>
        <div onClick={handleMyClick} key={isLoggedIn ? 'logged-in' : 'logged-out'}>
          {isLoggedIn ? '我的' : '登录/注册'}
        </div>
      </div>
    </div>
  );
};

export default Header;