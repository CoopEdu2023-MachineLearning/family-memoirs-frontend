import styles from './index.module.scss';
import {useEffect, useState} from "react";
import http from "@http";

export const Tags = ({setFilterTags}) => {
  const [ tags, setTags ] = useState({});
  useEffect(() => {
    http.get('/tags/recommended')
      .then(res => {
        const result = {};
        res.forEach(item => {
          result[item.name] = false;
        })
        setTags(result)
        console.log(result)
      })
      .catch(err => {
        console.error('请求出错:', err);
      })
  },[])

  useEffect(() => {
    setFilterTags(Object.entries(tags)
      .filter(([key, value]) => value === true)
      .map(([key]) => key))
  }, [tags]);

  return (
    <div className={styles.root}>
      <div className="tags">
        <div className="tags1">
          {Object.keys(tags).map((item, index) => {
            if (index < 2) {
              return (
                <div
                  key={index}
                  className={tags[item] ? "tagActive" : "tag"}
                  onClick={() => setTags({...tags, [item]: !tags[item]})}
                >
                  {item}
                </div>
              );
            }
            return null;
          })}
        </div>
        <div className="tags2">
          {Object.keys(tags).map((item, index) => {
            if (index >= 2) {
              return (
                <div
                  key={index}
                  className={tags[item] ? "tagActive" : "tag"}
                  onClick={() => setTags({...tags, [item]: !tags[item]})}
                >
                  {item}
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>
    </div>
  );
};
