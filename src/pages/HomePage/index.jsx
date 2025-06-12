import React, { useCallback, useState, useEffect } from 'react';
import DiagonalScrollAnimation from '@components/DiagonalScrollAnimation';
import styles from './index.module.scss';
import { Tags } from "@components/Tags/index.jsx";
import LoginComponents from "@components/LoginComponents/index.jsx";
import SignUp from "@components/SignUp/index.jsx";
// 移除 Header 的导入
import { AutoCompleteSearch } from "@components/SearchBox";
import { searchApi } from '@apis';
import ForgetPwdModel from "@components/ForgetPwdModel/index.jsx";

const HomePage = () => {
  const [filterTags, setFilterTags] = useState([]);
  const [homePageState, setHomePageState] = useState('homePage');
  // 移除 isLoggedIn 状态管理，因为Layout已经处理了

  const [stories, setStories] = useState([]);
  const [tellers, setTellers] = useState([]);

  const refine = useCallback(async (value) => {
    const { stories, tellers } = await searchApi(value, 15);
    setStories(stories);
    setTellers(tellers);
  }, []);

  // 移除 JWT token 检查的 useEffect

  // 移除 handleAuthButtonClick 和 handleLoginSuccess 函数

  return (
    <div className={styles.root}>
      {/* 移除 Header 组件 */}

      <div className={styles.searchContainer}>
        <AutoCompleteSearch stories={stories} tellers={tellers} refine={refine} />
      </div>

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
          // 移除 onLoginSuccess，因为Layout会处理
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