import React, { useEffect } from 'react';
import styles from './index.module.scss';
import { useState } from "react";
import { Typography } from 'antd';

function Card({ articleId, place, eventTag, tagOne, tagTwo }) {

  const { Link } = Typography;

  const getLocation = () => { };
  const getTags = () => { };
  const colors = ['#9A7E6F', '#C5CC9F', '#AB8F6D', '#42746A'];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  const [location1, setLocation1] = useState();
  const [location2, setLocation2] = useState();
  const [event, setEvent] = useState(eventTag);
  const [tag1, setTag1] = useState(tagOne)
  const [tag2, setTag2] = useState(tagTwo)

  useEffect(() => {
    if (place && place.length > 4) {
      setLocation1(place.slice(0, 3));
      setLocation2(place.slice(3));
    } else {
      setLocation1(place);
      setLocation2('');
    }
  }, [place]);
  return (
    <Link href={`/article/${articleId}`}>
      <div className={styles.root} style={{ backgroundColor: randomColor }}>
        <div className={styles.topText}>{location1}</div>
        <div className={styles.middleText}>{location2}</div>
        <div className={styles.bottomText}>{event}</div>
        <div className={styles.bottomSection}>
          <div className={styles.location}>{tag1}</div>
          <div className={styles.status}>{tag2}</div>
        </div>
      </div>
    </Link>
  );
}
export default Card;