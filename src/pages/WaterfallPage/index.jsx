// WaterfallPage.js
import React, { useState, useEffect } from "react";
import Waterfall from "@components/waterfall";
import styles from './index.module.scss';
import InterviewCard from "@components/Waterfallcard";
import { useEstimateHeight } from '@hooks/useEstimateHeight';
import Navbar from '@components/navbar'
import { Layout } from "antd";
import { getArticles } from "../../apis";
import { da } from "@faker-js/faker";

const { Content } = Layout;


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
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false); // To handle loading state
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const initialData = await getArticles(1, 10); // Fetching initial data
        console.log(initialData)
        setData(initialData);
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Run this only once when the component mounts

  const handleLoadMore = async () => {
  console.log("加载更多触发");
  setLoading(true);
  try {
    const newData = await getArticles(page + 1, 10);
    const newItems = newData.content;
    if (newItems.length === 0) {
      setHasMore(false);
      console.log(hasMore);
    } else {
      // 如果 data 是分页结构：{ content: [...] }
      setData(prev => ({
        ...prev,
        content: [...prev.content, ...newItems]
      }));

      setPage(p => p + 1);
    }
  } catch (error) {
    console.error("加载更多失败：", error);
  } finally {
    setLoading(false);
  }
};


  // 修改 itemRender 函数，直接返回 WaterfallItem 组件
  const itemRender = (item) => <WaterfallItem key={item.id} item={item} />;
  return (
    <Layout>
      <Navbar className={styles.navbar} />
      <Content className={styles.waterfallContainer}>
        <Waterfall
          items={data.content}
          marginX={20}
          itemRender={itemRender}
          cols={5}
          onLoadMore={handleLoadMore}
          hasMore={hasMore}
        />
      </Content>
    </Layout>
  );
};

export default WaterfallPage;
