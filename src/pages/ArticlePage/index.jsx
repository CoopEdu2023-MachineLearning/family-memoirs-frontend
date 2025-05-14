import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getArticleById } from "@http";
import styles from './index.module.scss';

// 导入组件
import Tags from '../../components/ArticleComponents/TagComponents';
import TextComponents from '../../components/ArticleComponents/TextComponents';
import UserDetails from '../../components/ArticleComponents/UserComponents';
import VoicePlayer from '../../components/ArticleComponents/VoicePlayer';
import TitleComponents from '../../components/ArticleComponents/TitleComponents';

export default function ArticlePage() {
    const { id } = useParams();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getArticleById(id)
            .then(res => {
                console.log('API响应:', res);
                if (res) {
                    setArticle(res);
                } else {
                    const errorMsg = '未知错误';
                    console.error('获取文章失败:', errorMsg);
                    setError(errorMsg);
                }
            })
            .catch(err => {
                console.error('请求异常:', err);
                setError('请求异常: ' + (err.message || err));
            })
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <div className={styles.loading}>加载中…</div>;
    if (error) return <div className={styles.error}>错误: {error}</div>;
    if (!article) return <div className={styles.notFound}>未能获取到文章</div>;

    // 准备语音播放器数据
    const audioTracks = article.audioFiles?.map((audio, index) => ({
        id: audio.id || `track-${index}`,
        title: audio.title || `录音 ${index + 1}`,
        src: audio.url,
        time: audio.duration || '00:00',
        location: audio.location || article.location
    })) || [];

    return (
        <div className={styles.root}>

            {/* 标签区域 */}
            <header className={styles.articleHeader}>
                {article.tags && article.tags.length > 0 && (
                    <Tags tags={article.tags} />
                )}
            </header>

            <div className={styles.articleContainer}>
                <aside className={styles.articleSidebar}>
                    {/* 标题组件 */}
                    <TitleComponents
                        title={article.title}
                        era={article.era}
                        location={article.location}
                        startYear={article.startYear}
                        endYear={article.endYear}
                        startMonth={article.startMonth}
                        endMonth={article.endMonth}
                    />
                    {article.user && (
                        <UserDetails
                            name={article.user.username}
                        />
                    )}
                    {audioTracks.length > 0 && (
                        <div className={styles.audioSection}>
                            <h3 className={styles.audioTitle}>口述历史录音</h3>
                            <VoicePlayer
                                tracks={audioTracks}
                                location={article.location}
                            />
                        </div>
                    )}
                </aside>
                <div className={styles.mainContent}>
                    <TextComponents text={article.text} />
                </div>
            </div>
        </div>
    );
}