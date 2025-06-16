import React, { useCallback, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AutoCompleteSearch } from "@components/SearchBox";
import { searchApi } from "@apis";
import styles from './index.module.scss';

const Header = ({ onAuthButtonClick, isLoggedIn }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [stories, setStories] = useState([]);
  const [tellers, setTellers] = useState([]);

  const refine = useCallback(async (value) => {
    const { stories, tellers } = await searchApi(value, 15);
    setStories(stories);
    setTellers(tellers);
  }, []);


  const isMyPage = location.pathname !== '/memoirs';
  const isArticlePage = location.pathname.includes('/article/');

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
        src='/logo1.svg'
        alt="logo"
        className={isMyPage ? styles.logoSmall : styles.logo}
        onClick={handleLogoClick}
        style={{ cursor: 'pointer' }}
      />
      <div className={styles.searchContainer}>
        <AutoCompleteSearch stories={stories} tellers={tellers} refine={refine} />
      </div>
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