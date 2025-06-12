import React, {useState, useEffect} from 'react';
import DiagonalScrollAnimation from '@components/DiagonalScrollAnimation';
import styles from './index.module.scss';
import {Tags} from "@components/Tags/index.jsx";
import LoginComponents from "@components/LoginComponents/index.jsx";
import SignUp from "@components/SignUp/index.jsx";
import Header from "@components/Header/index.jsx";

const HomePage = () => {
  const [filterTags, setFilterTags] = useState([]);
  const [homePageState, setHomePageState] = useState('homePage');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0); // 添加刷新key
  
  // 检查JWT token是否存在
  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem('token');
      setIsLoggedIn(!!token);
    };
    
    checkLoginStatus();
    
    // 监听storage变化
    window.addEventListener('storage', checkLoginStatus);
    
    return () => {
      window.removeEventListener('storage', checkLoginStatus);
    };
  }, []);
  
  // 处理登录成功后的状态更新
  const handleLoginSuccess = () => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
    setHomePageState('homePage');
    setRefreshKey(prev => prev + 1); // 强制重新渲染
  };
  
  // 处理登录/注册按钮点击
  const handleAuthButtonClick = () => {
    if (!isLoggedIn) {
      // 如果未登录，显示登录弹窗
      setHomePageState('login');
      console.log('login');
    }
    // 如果已登录，Header组件会直接处理跳转到/my页面
  };
  
  return (
    <div className={styles.root}>
      <Header 
        key={refreshKey} // 使用refreshKey强制重新渲染Header
        onAuthButtonClick={handleAuthButtonClick}
        isLoggedIn={isLoggedIn}
      />
      
      {/* 主页内容始终显示 */}
      <DiagonalScrollAnimation filterTags={filterTags} className='body'/>
      <div className="tags">
        <Tags setFilterTags={setFilterTags}/>
      </div>

      {/* 登录弹窗覆盖在主页内容之上 */}
      {homePageState === 'login' && 
        <div className={styles.modalOverlay}>
          <LoginComponents
            onSwitchToSignup={() => setHomePageState('signup')}
            onClose={() => setHomePageState('homePage')}
            onLoginSuccess={handleLoginSuccess}
          />
        </div>
      }
      
      {/* 注册弹窗覆盖在主页内容之上 */}
      {homePageState === 'signup' && 
        <div className={styles.modalOverlay}>
          <SignUp
            onSwitchToLogin={() => setHomePageState('login')}
            onClose={() => setHomePageState('homePage')}
          />
        </div>
      }
    </div>
  );
};

export default HomePage;