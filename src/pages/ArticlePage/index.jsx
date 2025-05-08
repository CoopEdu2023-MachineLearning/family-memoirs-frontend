// src/pages/ArticlePage.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getArticleById } from "@http";

export default function ArticlePage() {
    const { id } = useParams();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getArticleById(id)
            .then(res => {
                console.log('API响应:', res); // 调试日志
                // 检查实际的响应结构
                if (res) {
                    setArticle(res);
                } else {
                    // 记录详细错误
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

    if (loading) return <div>加载中…</div>;
    if (error) return <div>错误: {error}</div>;
    if (!article) return <div>未能获取到文章</div>;

    // 确保 text 字段存在再进行拆分
    const paragraphs = article.text ?
        article.text.split('\n').filter(p => p.trim()) :
        ['无正文内容'];

    return (
        <div className="article-container">
            <aside className="article-sidebar">
                <div className="meta-item">
                    <label>时期</label>
                    <div>{article.era || '未知'}</div>
                </div>
                <div className="meta-item">
                    <label>时间</label>
                    <div>{article.startDate || '未知'} 至 {article.endDate || '未知'}</div>
                </div>
                <div className="meta-item">
                    <label>地点</label>
                    <div>{article.location || '未知'}</div>
                </div>
                <div className="meta-item">
                    <label>作者</label>
                    <div>{article.user?.username || '未知'}</div>
                </div>
                <div className="meta-item">
                    <label>简介</label>
                    <div>{article.description || '无简介'}</div>
                </div>
            </aside>

            <main className="article-content">
                {paragraphs.map((p, idx) => (
                    <p key={idx}>{p}</p>
                ))}
            </main>
        </div>
    );
}