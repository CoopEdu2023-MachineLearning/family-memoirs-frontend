import React from 'react';
import styles from './index.module.scss';
import {useState} from "react";
export function Card() {
    const getLocation = () => {};
    const getTags = () => {};
    const colors = ['#9A7E6F', '#C5CC9F', '#AB8F6D', '#42746A'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const [location, setLocation] = useState('重庆市南桐')
    const [location2, setLine2] = useState('')
    const [location3, setLine3] = useState('')
    const [tag1, setTag1] = useState('煤矿场')
    const [tag2, setTag2] = useState('资源枯竭')
  return (
      <div className={styles.root} style={{ backgroundColor: randomColor}}>
        <div className={styles.topText}>{location}</div>
        <div className={styles.middleText}>{location2}</div>
        <div className={styles.bottomText}>{location3}</div>
        <div className={styles.bottomSection}>
          <div className={styles.location}>{tag1}</div>
          <div className={styles.status}>{tag2}</div>
        </div>
      </div>
  );
}
export default Card;