"use client";
import React, { useEffect, useRef } from "react";
import 'wc-waterfall'; // 引入 wc-waterfall 组件
import styles from "./index.module.scss"; // 引入样式

export default function Waterfall({ 
  items = [], 
  itemRender, 
  className = "", 
  column = "5", 
  onLoadMore,     // 加载更多函数
  hasMore = true, // 是否还有更多内容
}) {
  const loadMoreRef = useRef(null);

  useEffect(() => {
    if (!onLoadMore || !hasMore) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onLoadMore(); // 触发加载更多
        }
      },
      {
        root: null,
        rootMargin: "200px", // 提前加载，增强体验
        threshold: 0.1,
      }
    );

    const current = loadMoreRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [onLoadMore, hasMore]);

  return (
    <wc-waterfall gap="10" cols={column} class={className}>
      {items.map((item, index) => (
        <div key={item.id}>
          {itemRender(item, index)}
        </div>
      ))}
      
      {/* 用于触发加载更多 */}
      {hasMore && (
        <div ref={loadMoreRef} className={styles.loadTrigger} />
      )}
    </wc-waterfall>
  );
}
