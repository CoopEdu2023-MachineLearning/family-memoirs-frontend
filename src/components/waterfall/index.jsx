"use client";
import React, { useEffect, useRef } from "react";
import 'wc-waterfall'; // 引入 wc-waterfall Web Component
import styles from "./index.module.scss"; // 自定义样式

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
          onLoadMore();
        }
      },
      {
        root: null,
        rootMargin: "200px", // 提前触发加载
        threshold: 0.1,
      }
    );

    const triggerEl = loadMoreRef.current;
    if (triggerEl) observer.observe(triggerEl);

    return () => {
      if (triggerEl) observer.unobserve(triggerEl);
    };
  }, [onLoadMore, hasMore]);

  return (
    <>
      <wc-waterfall gap="10" cols={column} class={className}>
        {items.map((item, index) => (
          <div key={item.id}>
            {itemRender(item, index)}
          </div>
        ))}
      </wc-waterfall>

      {/* 触发加载更多：必须放在 wc-waterfall 外 */}
      {hasMore && (
        <div
          ref={loadMoreRef}
          className={styles.loadTrigger}
          style={{ height: 40 }} // 确保可观察
        />
      )}
    </>
  );
}
