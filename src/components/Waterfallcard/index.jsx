import React from "react";
import { Card, Avatar, Tag, Space } from "antd";
import styles from "./index.module.scss";

const { Meta } = Card;

const InterviewCard = ({ avatar, name, genderInfo, description, tags = [] }) => {
  return (
    <Card className={styles.card} bordered={false}>
      <div className={styles.header}>{description.datePlace}</div>
      <Meta
        avatar={<Avatar size={64} src={avatar} />}
        title={<span className={styles.name}>{name}</span>}
        description={<div className={styles.genderInfo}>{genderInfo}</div>}
      />
      <div className={styles.content}>{description.text}</div>
      <Space className={styles.tags}>
        {tags.map((tag, index) => (
          <Tag key={index}>{tag}</Tag>
        ))}
      </Space>
    </Card>
  );
};

export default InterviewCard;
