import React from 'react';
import styles from './index.module.scss';

const TextComponents = ({ text }) => {
  const paragraphs = text ?
    text.split('\n').filter(p => p.trim()) :
    ['无正文内容'];

  return (
    <main className={styles.articleContent}>
      {paragraphs.map((p, idx) => (
        <p key={idx}>{p}</p>
      ))}
    </main>
  );
};

export default TextComponents;