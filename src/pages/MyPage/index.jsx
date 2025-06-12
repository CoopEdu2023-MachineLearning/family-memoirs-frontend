import React, { useState, useEffect } from 'react';
import styles from './index.module.scss';
import Header from '@components/Header/index.jsx';
import { getUserInfo, getTellerArticles } from '@apis';

const MyPage = () => {
  const isLoggedIn = !!localStorage.getItem('token');
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTellerId, setSelectedTellerId] = useState(null);
  const [tellerArticles, setTellerArticles] = useState([]);
  const [articlesLoading, setArticlesLoading] = useState(false);
  
  // 这里需要获取当前用户ID，可能从localStorage或token中解析
  // 暂时使用固定ID 1 作为示例
  const userId = 1;
  
  useEffect(() => {
    const fetchUserData = async () => {
      if (!isLoggedIn) {
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        setError(null);
        
        // 请求用户信息（包含讲述者列表）
        const userData = await getUserInfo(userId);
        setUserInfo(userData);
        
        // 如果有讲述者，默认选中第一个
        if (userData.teller && userData.teller.length > 0) {
          const firstTellerId = userData.teller[0].id;
          setSelectedTellerId(firstTellerId);
          await fetchTellerArticles(firstTellerId);
        }
      } catch (err) {
        console.error('获取用户数据失败:', err);
        setError(err.message || '网络请求失败');
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserData();
  }, [isLoggedIn, userId]);
  
  // 获取讲述者的作品列表
  const fetchTellerArticles = async (tellerId) => {
    try {
      setArticlesLoading(true);
      const articles = await getTellerArticles(tellerId);
      setTellerArticles(articles || []);
    } catch (err) {
      console.error('获取讲述者作品失败:', err);
      setTellerArticles([]);
    } finally {
      setArticlesLoading(false);
    }
  };
  
  // 点击讲述者头像
  const handleTellerClick = async (tellerId) => {
    if (selectedTellerId === tellerId) return;
    
    setSelectedTellerId(tellerId);
    await fetchTellerArticles(tellerId);
  };
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/home';
  };
  
  // 未登录状态
  if (!isLoggedIn) {
    return (
      <div className={styles.root}>
        <Header isLoggedIn={isLoggedIn} />
        <div className={styles.container}>
          <div className={styles.loginPrompt}>
            <h1>请先登录</h1>
            <p>您需要登录后才能查看个人中心</p>
          </div>
        </div>
      </div>
    );
  }
  
  // 加载中状态
  if (loading) {
    return (
      <div className={styles.root}>
        <Header isLoggedIn={isLoggedIn} />
        <div className={styles.container}>
          <div className={styles.loadingState}>
            <h1>加载中...</h1>
          </div>
        </div>
      </div>
    );
  }
  
  // 错误状态
  if (error) {
    return (
      <div className={styles.root}>
        <Header isLoggedIn={isLoggedIn} />
        <div className={styles.container}>
          <div className={styles.errorState}>
            <h1>加载失败</h1>
            <p>错误信息: {error}</p>
            <button onClick={() => window.location.reload()} className={styles.retryBtn}>
              重新加载
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className={styles.root}>
      <Header isLoggedIn={isLoggedIn} />
      <div className={styles.container}>
        {/* 用户信息区域 - 顶部 */}
        {userInfo && (
          <div className={styles.userInfoSection}>
            <div className={styles.userBasicInfo}>
              {userInfo.avatarUrl && (
                <img 
                  src={userInfo.avatarUrl} 
                  alt="用户头像" 
                  className={styles.userAvatar}
                />
              )}
              <div className={styles.userDetails}>
                <h1>{userInfo.username}</h1>
                <p>{userInfo.email}</p>
                {userInfo.introduction && (
                  <p className={styles.userIntro}>{userInfo.introduction}</p>
                )}
              </div>
              <button onClick={handleLogout} className={styles.logoutBtn}>
                退出登录
              </button>
            </div>
          </div>
        )}
        
        {/* 主要内容区域 */}
        <div className={styles.mainContent}>
          {/* 左侧讲述者列表 */}
          <div className={styles.tellersPanel}>
            <h2>我的讲述者</h2>
            {userInfo && userInfo.teller && userInfo.teller.length > 0 ? (
              <div className={styles.tellersList}>
                {userInfo.teller.map((teller) => (
                  <div 
                    key={teller.id} 
                    className={`${styles.tellerItem} ${selectedTellerId === teller.id ? styles.selected : ''}`}
                    onClick={() => handleTellerClick(teller.id)}
                  >
                    <div className={styles.tellerAvatar}>
                      {teller.avatarUrlOld ? (
                        <img 
                          src={`http://localhost:8080/teller/avatar${teller.avatarUrlOld}`} 
                          alt={teller.nameOld}
                        />
                      ) : (
                        <div className={styles.defaultAvatar}>
                          {teller.nameOld ? teller.nameOld.charAt(0) : '?'}
                        </div>
                      )}
                    </div>
                    <div className={styles.tellerName}>
                      {teller.nameOld || '未命名讲述者'}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.noTellers}>
                <p>您还没有创建任何讲述者</p>
              </div>
            )}
          </div>
          
          {/* 右侧作品列表 */}
          <div className={styles.articlesPanel}>
            <h2>作品列表</h2>
            {selectedTellerId ? (
              <div className={styles.articlesContent}>
                {articlesLoading ? (
                  <div className={styles.articlesLoading}>
                    <p>加载作品中...</p>
                  </div>
                ) : tellerArticles.length > 0 ? (
                  <div className={styles.articlesList}>
                    {tellerArticles.map((article) => (
                      <div key={article.id} className={styles.articleItem}>
                        <h3>{article.title || '无标题'}</h3>
                        <p className={styles.articleDesc}>
                          {article.description || '暂无描述'}
                        </p>
                        <div className={styles.articleMeta}>
                          <span>创建时间: {article.createTime || '未知'}</span>
                          {article.tags && article.tags.length > 0 && (
                            <div className={styles.articleTags}>
                              {article.tags.map((tag, index) => (
                                <span key={index} className={styles.tag}>
                                  {tag.name}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className={styles.noArticles}>
                    <p>该讲述者还没有任何作品</p>
                  </div>
                )}
              </div>
            ) : (
              <div className={styles.noSelection}>
                <p>请选择一个讲述者查看其作品</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;