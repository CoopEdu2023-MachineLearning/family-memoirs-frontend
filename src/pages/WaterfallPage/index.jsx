// WaterfallPage.js
import React, { useState } from "react";
import Waterfall from "@components/waterfall"; // Import the Waterfall component
import styles from './index.module.scss'; // Import the SCSS styles
import { Card, Avatar, Tag, Space } from "antd";
import InterviewCard from "@components/Waterfallcard";
import { useEstimateHeight } from '@hooks/useEstimateHeight';

const { Meta } = Card;


const WaterfallPage = () => {
  // Mock data with different scale values for dynamic sizes
  const [data] = useState([
    {
      scale: 1.5,
      id: 1,
      name: "周根生",
      avatar: "https://example.com/avatar.jpg",
      genderInfo: "男，1936年生于呼和浩特。北京初代男团、现在是胡同里的老大爷",
      description: {
        datePlace: "1996年 8月 重庆",
        text: "我记得小时候，我们家是厂里家属院的，红灰穿插的苏式尖顶平房，成一道排开来。木头床，尿盆可以放在卧室也可以放在客厅，板板正正的都是小板凳……我记得小时候，我们家是厂里家属院的，红灰穿插的苏式尖顶平房，成一道排开来。木头床，尿盆可以放在卧室也可以放在客厅，板板正正的都我记得小时候，我们家是厂里家属院的，红灰穿插的苏式尖顶平房，成一道排开来。木头床，尿盆可以放在卧室也可以放在客厅，板板正正的都",
      },
      tags: ["改革开放", "创业", "男团"],
    },
    {
      scale: 1.5,
      id: 1,
      name: "周根生",
      avatar: "https://example.com/avatar.jpg",
      genderInfo: "男，1936年生于呼和浩特。北京初代男团、现在是胡同里的老大爷",
      description: {
        datePlace: "1996年 8月 重庆",
        text: "我记得小时候，我们家是厂里家属院的，红灰穿插的苏式尖顶平房，成一道排开来。木头床，尿盆可以放在卧室也可以厂里家属院的，红灰穿插的苏式尖顶平房，成一道排开来。木头床，尿盆可以放在卧室也可以放在客厅，板板正正的都是小板凳……",
      },
      tags: ["改革开放", "创业", "男团"],
    },
    {
      scale: 1.5,
      id: 1,
      name: "周根生",
      avatar: "https://example.com/avatar.jpg",
      genderInfo: "男，1936年生于呼和浩特。北京初代男团、现在是胡同里的老大爷",
      description: {
        datePlace: "1996年 8月 重庆",
        text: "我记得小时候，我们家是厂里家属院的，红灰穿插的苏我们家是厂里家属院的式里家属院的，红灰穿插的苏尖顶平房，成一道排开来。木头床，尿盆可以放在卧室也可以放在客厅，板板正正的都是小板凳……",
      },
      tags: ["改革开放", "创业", "男团"],
    },
    {
      scale: 1.5,
      id: 1,
      name: "周根生",
      avatar: "https://example.com/avatar.jpg",
      genderInfo: "男，1936年生于呼和浩特。北京初代男团、现在是胡同里的老大爷",
      description: {
        datePlace: "1996年 8月 重庆",
        text: "我记得小时候，我们家是厂里家属院的，红灰穿插的苏式尖顶平房，成一道排开来。木头的苏式尖顶平房，成一道排开来。木床，尿盆可以放在卧室也可以放在客厅，板板正正的都是小板凳…时候，我们家是厂里家属院的，红灰穿插的苏式尖顶平房，成一道排开来。木头床，尿盆可以放在卧室也可以放在客厅，板板正正的…",
      },
      tags: ["改革开放", "创业", "男团"],
    },
    {
      scale: 1.5,
      id: 1,
      name: "周根生",
      avatar: "https://example.com/avatar.jpg",
      genderInfo: "男，1936年生于呼和浩特。北京初代男团、现在是胡同里的老大爷",
      description: {
        datePlace: "1996年 8月 重庆",
        text: "我记得小时候，我们家是厂里家属院的，红灰穿插的苏式尖顶平房，成一道排开来。木头床，尿盆可以放在卧室也可以放在客厅，板板正正的都是小板凳……",
      },
      tags: ["改革开放", "创业", "男团"],
    },
    {
      scale: 1.5,
      id: 1,
      name: "周根生",
      avatar: "https://example.com/avatar.jpg",
      genderInfo: "男，1936年生于呼和浩特。北京初代男团、现在是胡同里的老大爷",
      description: {
        datePlace: "1996年 8月 重庆",
        text: "我记得小时候，我们家是厂里家属院的，红灰穿插的苏式尖顶平房，成一道排开来。木头床，尿盆可以放在卧室也可以放在客厅，板板正正的都是小板凳……",
      },
      tags: ["改革开放", "创业", "男团"],
    },
    {
      scale: 1.5,
      id: 1,
      name: "周根生",
      avatar: "https://example.com/avatar.jpg",
      genderInfo: "男，1936年生于呼和浩特。北京初代男团、现在是胡同里的老大爷",
      description: {
        datePlace: "1996年 8月 重庆",
        text: "我记得小时候，我们家是厂里家属院的，红灰穿插的苏式尖顶平房，成一道排开来。木头床，尿盆可以放在卧室也可以放在客厅，板板正正的都是小板凳……",
      },
      tags: ["改革开放", "创业", "男团"],
    },
    {
      scale: 1.5,
      id: 1,
      name: "周根生",
      avatar: "https://example.com/avatar.jpg",
      genderInfo: "男，1936年生于呼和浩特。北京初代男团、现在是胡同里的老大爷",
      description: {
        datePlace: "1996年 8月 重庆",
        text: "我记得小时候，我们家是厂里家属院的，红灰穿插的苏式尖顶平房，成一道排开来。木头床，尿盆可以放在卧室也可以放在客厅，板板正正的都是小板凳……",
      },
      tags: ["改革开放", "创业", "男团"],
    },
    {
      scale: 1.5,
      id: 1,
      name: "周根生",
      avatar: "https://example.com/avatar.jpg",
      genderInfo: "男，1936年生于呼和浩特。北京初代男团、现在是胡同里的老大爷",
      description: {
        datePlace: "1996年 8月 重庆",
        text: "我记得小时候，我们家是厂里家属院的，红灰穿插的苏式尖顶平房，成一道排开来。木头床，尿盆可以放在卧室也可以放在客厅，板板正正的都是小板凳……",
      },
      tags: ["改革开放", "创业", "男团"],
    },
    {
      scale: 1.5,
      id: 1,
      name: "周根生",
      avatar: "https://example.com/avatar.jpg",
      genderInfo: "男，1936年生于呼和浩特。北京初代男团、现在是胡同里的老大爷",
      description: {
        datePlace: "1996年 8月 重庆",
        text: "我记得小时候，我们家是厂里家属院的，红灰穿插的苏式尖顶平房，成一道排开来。木头床，尿盆可以放在卧室也可以放在客厅，板板正正的都是小板凳……",
      },
      tags: ["改革开放", "创业", "男团"],
    },

  ]);

  // Render function for each item with dynamic height based on the scale
  const itemRender = (item, index) => {
    const [height, ref] = useEstimateHeight(item);
    return (
      <div
        key={item.id}
        className={styles.waterfallItem}
      >
        <InterviewCard
          avatar={item.avatar}
          name={item.name}
          genderInfo={item.genderInfo}
          description={item.description}
          tags={item.tags}
        />
      </div>
    );
  }
  return (
    <div className={styles.waterfallContainer}>
      <div>
        <Waterfall
          items={data} // Pass the list of data to the Waterfall component
          marginX={20} // Set the horizontal margin between items
          itemRender={itemRender} // Pass the render function
          cols={5}
        />
      </div>
    </div>
  );
};

export default WaterfallPage;
