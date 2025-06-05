import React from "react";
import { Card, Avatar, Tag, Space } from "antd";
import styles from "./index.module.scss";

const { Meta } = Card;

// 工具函数：截断字符串并加省略号
const truncate = (text, maxLength) => {
  if (!text) return "";
  return text.length > maxLength ? text.slice(0, maxLength) + "…" : text;
};

const InterviewCard = ({ location,avatar, name, teller = null, description, tags = [], start = "?", end ="?" }) => {
  const truncatedTitle = teller
    ? truncate(`${start}年 - ${end}年   ${location}`, 25)
    : "无口述者信息";
  const truncatedText = truncate(description, 80);
  const truncatedGenderInfo = teller ? truncate(teller.gender || "未知", 16) : "未知";

  return (
    <Card className={styles.card} bordered={false}>
      <div className={styles.header}>{truncatedTitle}</div>
      <Meta
        avatar={<Avatar size={64} src={avatar} />}
        title={<span className={styles.name}>{teller ? truncate(teller.nameOld || "未知", 16) : "未知"}</span>}
        description={<div className={styles.genderInfo}>{teller ? truncate(teller.introOld || "未知", 16) : "未知"}</div>}
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
