// WaterfallPage.js
import React, { useState, useEffect } from "react";
import Waterfall from "@components/waterfall";
import styles from './index.module.scss';
import InterviewCard from "@components/Waterfallcard";
import { useEstimateHeight } from '@hooks/useEstimateHeight';
import { getArticles } from "../../apis";

// 移除antd的Layout导入，因为已经有外层的AppLayout了
// import { Layout } from "antd";
// const { Content } = Layout;

// 新建组件 WaterfallItem，内部调用 Hook
const WaterfallItem = ({ item }) => {
  const [height, ref] = useEstimateHeight(item);
  return (
    <div key={item.id} className={styles.waterfallItem} ref={ref}>
      <InterviewCard
        avatar={item.avatar}
        start = {item.startYear}
        end = {item.endYear}
        teller = {item.teller}
        description={item.text}
        location = {item.location}
        tags={item.tags.name}
      />
    </div>
  );
};

const WaterfallPage = () => {
  const [data, setData] = useState({ content: [] });
  console.log(data)
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const initialData = await getArticles(0, 10);
        setData(initialData);
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleLoadMore = () => {
    console.log("加载更多触发");
    setTimeout(() => {
      const newItems = getArticles(page + 1, 10).content;
      if (newItems.length === 0) {
        setHasMore(false);
      } else {
        setData(prev => [...prev, ...newItems]);
        setPage(p => p + 1);
      }
    }, 800);
  };

  const itemRender = (item) => <WaterfallItem key={item.id} item={item} />;
  
  return (
    // 直接使用div容器，不再嵌套antd的Layout
    <div className={styles.waterfallContainer}>
      <Waterfall
        items={data.content}
        marginX={20}
        itemRender={itemRender}
        cols={5}
        onLoadMore={handleLoadMore}
        hasMore={hasMore}
      />
    </div>
  );
};

export default WaterfallPage;
