import React from 'react';
import {Button, Input, message, Checkbox} from 'antd';
import styles from './index.module.scss';
import { Typography } from "antd";
import { useNavigate } from "react-router-dom";
import http from "@http";
import { CloseOutlined } from '@ant-design/icons';

const LoginComponents = ({ onSwitchToSignup, onClose, onLoginSuccess }) => {
  const { Title, Link, Text } = Typography;
  const [ isAllowed, setIsAllowed ] = React.useState(false);
  const [ email, setEmail ] = React.useState('');
  const [ password, setPassword ] = React.useState('');
  const [ loading, setLoading ] = React.useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    if (!email || !password) {
      message.error('请输入邮箱和密码');
      return;
    }
    
    setLoading(true);
    try {
      const token = await http.post('/users/login', {
        email: email,
        password: password
      });
      localStorage.setItem('token', token);
      message.success('登录成功');
      
      // 调用登录成功回调
      if (onLoginSuccess) {
        onLoginSuccess();
      }
      
      // 关闭弹窗
      onClose();
      
      // 移除这行导航，因为已经在/home页面了
      // navigate('/home');
      
    } catch (error) {
      message.error(error.message || '登录失败，请稍后重试');
      console.error('登录失败:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <Button 
          className={styles.closeButton}
          type="text" 
          icon={<CloseOutlined />} 
          onClick={onClose}
        />
        <h1 className={styles.title}>登录「家书万金」</h1>
        
        <div className={styles.inputGroup}>
          <p className={styles.label}>邮箱</p>
          <Input 
            className={styles.input}
            placeholder="输入邮箱" 
            value={email}
            onChange={handleEmailChange} 
          />
          <div className={styles.passwordGroup}>
            <Text className={styles.label}>密码</Text>
            <Text className={styles.forgotPassword} onClick={()=>{navigate('/forget')}}>忘记密码</Text>
          </div>

          <Input.Password 
            className={styles.input}
            placeholder="输入密码" 
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        

        <Button 
          className={styles.loginButton}
          onClick={handleLogin} 
          disabled={!isAllowed}
          loading={loading}
        >
          登录
        </Button>
        
        <div className={styles.footer}>
          <div className={styles.leftFooter}>
            <Text>没有账号？</Text>
            <Button className={styles.registerButton} type="link" onClick={onSwitchToSignup}>注册</Button>
          </div>
          <div className={styles.rightFooter}>
            <Checkbox onChange={(e) => setIsAllowed(e.target.checked)}>同意<Link>协议</Link></Checkbox>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginComponents;