import React from 'react';
import {Button, Input, message} from 'antd';
import styles from './index.module.scss';
import { Typography, Checkbox } from "antd";
import {useNavigate} from "react-router-dom";
import http from "@http";

const LoginComponents = () => {
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
      // 这里直接拿到 token
      const token = await http.post('/users/login', {
        username: email,
        password: password
      });
      localStorage.setItem('token', token);
      message.success('登录成功');
      navigate('/home');
    } catch (error) {
      // error.message 即为后端返回的 message
      message.error(error.message || '登录失败，请稍后重试');
      console.error('登录失败:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.root}>
      <div className='inputGroup'>
        <Title level={4}>登录「家书万金」</Title>
        <Text>邮箱</Text>
        <Input 
          className='inputBar' 
          placeholder="输入邮箱" 
          value={email}
          onChange={handleEmailChange} 
        />
        <Text>密码</Text>
        <Input.Password 
          className='inputBar' 
          placeholder="输入密码" 
          value={password}
          onChange={handlePasswordChange}
        />
        <Text onClick={()=>{navigate('/forget')}} underline>忘记密码</Text>

        <Button 
          onClick={handleLogin} 
          block 
          disabled={!isAllowed}
          loading={loading}
        >
          登录
        </Button>
        <div className='footer'>
          <div className='leftFooter'>
            <Text>没有账号？</Text>
            <Button className='registerButton' type="link" onClick={()=>{navigate('/register')}}>注册</Button>
          </div>
          <div className={'rightFooter'}>
            <Checkbox onClick={()=>{setIsAllowed(!isAllowed)}}>同意<Link>协议</Link></Checkbox>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginComponents;