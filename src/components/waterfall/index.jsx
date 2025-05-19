"use client";
import React from "react";
import 'wc-waterfall';  // 引入 wc-waterfall
import styles from "./index.module.scss"; // 样式

export default function Waterfall({ items = [], itemRender, className = "" , column = "5"}) {
  return (
    <wc-waterfall gap="10" cols={column}>
      {items.map((item, index) => (
        <div
          key={item.id}
        >
          {itemRender(item, index)} {/* 渲染每个项 */}
        </div>
      ))}
    </wc-waterfall>
  );
}
