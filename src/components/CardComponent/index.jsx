import React from 'react';
import styles from './index.module.scss';
import {useState} from "react";

export function Card({location, tag1, tag2}) {
    const getLocation = () => {};
    const getTags = () => {};
    const colors = ['#9A7E6F', '#C5CC9F', '#AB8F6D', '#42746A'];

    // 使用useState确保颜色只在组件首次渲染时生成
    const [randomColor] = useState(() => {
      return colors[Math.floor(Math.random() * colors.length)];
    });

    return (
      <div className={styles.root} style={{ backgroundColor: randomColor}}>
        <div className={styles.topText}>{location}</div>
        <div className={styles.bottomSection}>
          <div className={styles.location}>{tag1}</div>
          <div className={styles.status}>{tag2}</div>
        </div>
      </div>
  );
}
export default Card;