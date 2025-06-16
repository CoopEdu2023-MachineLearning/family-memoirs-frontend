import React, { useState, useEffect } from 'react';
import DiagonalScrollAnimation from '@components/DiagonalScrollAnimation';
import styles from './index.module.scss';
import { Tags } from "@components/Tags/index.jsx";
import LoginComponents from "@components/LoginComponents/index.jsx";
import SignUp from "@components/SignUp/index.jsx";
import Header from "@components/Header/index.jsx";
import ForgetPwdModel from "@components/ForgetPwdModel/index.jsx";

const HomePage = () => {
  const [filterTags, setFilterTags] = useState([]);
  const [homePageState, setHomePageState] = useState('homePage');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 检查JWT token是否存在
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  // 处理登录/注册按钮点击
  const handleAuthButtonClick = () => {
    if (isLoggedIn) {
      // 如果已登录，可以跳转到个人中心或显示用户菜单
      setHomePageState('me');
      console.log('跳转到个人中心');
      // 这里可以添加跳转逻辑或显示用户菜单
    } else {
      // 如果未登录，显示登录弹窗
      setHomePageState('login');
      console.log('login');
    }
  };

  // 处理登录成功后的状态更新
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setHomePageState('homePage');
  };

  return (
    <div className={styles.root}>
      <Header
        onAuthButtonClick={handleAuthButtonClick}
        isLoggedIn={isLoggedIn}
      />

      {homePageState === 'homePage' &&
        <>
          <DiagonalScrollAnimation filterTags={filterTags} className='body' />
          <div className="tags">
            <Tags setFilterTags={setFilterTags} />
          </div>
        </>
      }

      {homePageState === 'login' &&
        <LoginComponents
          onSwitchToSignup={() => setHomePageState('signup')}
          onSwitchToForgetPassword={() => setHomePageState('forgetPassword')}
          onClose={() => setHomePageState('homePage')}
          onLoginSuccess={handleLoginSuccess}
        />
      }

      {homePageState === 'signup' &&
        <SignUp
          onSwitchToLogin={() => setHomePageState('login')}
          onClose={() => setHomePageState('homePage')}
        />
      }

      {homePageState === 'forgetPassword' &&
        <ForgetPwdModel
          onClose={() => setHomePageState('homePage')}
        />
      }
    </div>
  );
};

export default HomePage;