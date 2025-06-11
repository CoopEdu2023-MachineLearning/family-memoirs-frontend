import React from 'react';
import styles from './index.module.scss';

const Header = ({ onAuthButtonClick, isLoggedIn }) => {
  return (
    <div className={styles.header}>
      <img src='/logo.svg' alt="logo" className={styles.logo}/>
      <img src=''/>
      <div className={styles.topBar}>
        <div>购买实体专辑</div>
        <div>关于我们</div>
        <div onClick={onAuthButtonClick}>
          {isLoggedIn ? '我的' : '登录/注册'}
        </div>
      </div>
    </div>
  );
};

export default Header;