import React from "react";
import { Card, Avatar, Tag, Space } from "antd";
import styles from "./index.module.scss";

const { Meta } = Card;

// 工具函数：截断字符串并加省略号
const truncate = (text, maxLength) => {
  if (!text) return "";
  return text.length > maxLength ? text.slice(0, maxLength) + "…" : text;
};

const InterviewCard = ({ avatar, name, genderInfo, startYear,location, startMonth, description, tags = [] }) => {
  const truncatedTitle = truncate(startYear + "年 " + startMonth + "月 " + location, 25);
  const truncatedText = truncate(description, 80);
  const truncatedGenderInfo = truncate(genderInfo, 16);

  return (
    <Card className={styles.card} bordered={false}>
      <div className={styles.header}>{truncatedTitle}</div>
      <Meta
        avatar={<Avatar size={64} src={avatar} />}
        title={<span className={styles.name}>{name}</span>}
        description={<div className={styles.genderInfo}>{truncatedGenderInfo}</div>}
      />
      <div className={styles.content}>{truncatedText}</div>
      <Space className={styles.tags}>
        {tags.slice(0, 4).map((tag, index) => (
          <Tag key={index}>{truncate(tag, 10)}</Tag>
        ))}
      </Space>
    </Card>
  );
};

export default InterviewCard;
