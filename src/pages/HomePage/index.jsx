import React, {useState, useEffect} from 'react';
import DiagonalScrollAnimation from '@components/DiagonalScrollAnimation';
import styles from './index.module.scss';
import {Tags} from "@components/Tags/index.jsx";
import LoginComponents from "@components/LoginComponents/index.jsx";
import SignUp from "@components/SignUp/index.jsx";

const HomePage = () => {
  const [ filterTags, setFilterTags] = useState([]);
  const [ loginState, setLoginState] = useState('');
  const [ isLoggedIn, setIsLoggedIn] = useState(false);
  
  // 检查JWT token是否存在
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);
  
  // 处理登录/注册按钮点击
  const handleAuthButtonClick = () => {
    if (isLoggedIn) {
      // 如果已登录，可以跳转到个人中心或显示用户菜单
      console.log('跳转到个人中心');
      // 这里可以添加跳转逻辑或显示用户菜单
    } else {
      // 如果未登录，显示登录弹窗
      setLoginState('login');
      console.log('login');
    }
  };
  
  // 处理登录成功后的状态更新
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setLoginState('');
  };
  
  return (
    <div className={styles.root}>
      <div className='header'>
        <img src='../../../public/logo.svg' alt="logo" className={styles.logo}/>

        <div className='topBar'>
          <div>购买实体专辑</div>
          <div>关于我们</div>
          <div onClick={handleAuthButtonClick}>
            {isLoggedIn ? '我的' : '登录/注册'}
          </div>
        </div>
      </div>
      <DiagonalScrollAnimation filterTags={filterTags} className='body'/>
      <div className="tags">
        <Tags setFilterTags={setFilterTags}/>
      </div>
      {
        loginState === 'login' && <LoginComponents 
          onSwitchToSignup={() => setLoginState('signup')} 
          onClose={() => setLoginState('')}
          onLoginSuccess={handleLoginSuccess}
        />
      }
      {
        loginState === 'signup' && <SignUp 
          onSwitchToLogin={() => setLoginState('login')} 
          onClose={() => setLoginState('')}
        />
      }
    </div>
  );
};

export default HomePage;