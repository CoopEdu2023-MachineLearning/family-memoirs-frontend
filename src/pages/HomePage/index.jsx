import React from 'react';
import DiagonalScrollAnimation from '@components/DiagonalScrollAnimation';
import styles from './index.module.scss';

const HomePage = () => {
  return (
    <div className={styles.root}>
      <DiagonalScrollAnimation />
    </div>
  );
};

export default HomePage;