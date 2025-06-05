import React from 'react';
import { Layout, Menu, Input, Switch } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import styles from './index.module.scss';

const { Header } = Layout;

const Navbar = () => {
  return (
    <Header className={styles.navbar}>
      <div className={styles.left}>
        <div className={styles.logo}>家书<br />万金</div>
      </div>

      <div className={styles.center}>
        <Input
          className={styles.search}
          placeholder="搜索"
          prefix={<SearchOutlined />}
        />
        <div className={styles.tabs}>
          <span className={styles.tab}>内容</span>
          <span className={styles.tab}>讲述者</span>
          <span className={styles.tab}>用户</span>
        </div>
      </div>

      <div className={styles.right}>
        <span className={styles.menuItem}>购买实体书籍</span>
        <span className={styles.menuItem}>关于我们</span>
        <span className={styles.menuItem}>我的</span>
        <div className={styles.switchContainer}>
          <span className={styles.switchLabel}>精确搜索</span>
          <Switch size="small" />
        </div>
      </div>
    </Header>
  );
};

export default Navbar;
