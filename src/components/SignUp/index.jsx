import styles from './index.module.scss';
import {Button, Input, Space} from 'antd';
import { useEffect, useState } from "react";
import { getEmailCodeApi } from "@apis/getEmailCodeApi/index.js";
import { signup } from "@apis/signUpApi/index.js";
import Checkbox from "antd/es/checkbox/Checkbox";
import { CloseOutlined } from '@ant-design/icons';

function SignUp({ onSwitchToLogin, onClose }) {
    const [password, setPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState()
    const [email, setEmail] = useState()
    const [username, setUsername] = useState()  // 添加username状态
    const [invitationCode, setInvitationCode] = useState()
    const [verificationCode, setVerificationCode] = useState()
    const isButtonDisabled = !password || !confirmPassword || !email || !username || !invitationCode || !verificationCode;  // 添加username验证

    function sendCode() {
        try {
            getEmailCodeApi(email).then(r => {
                console.log(r);
            }).catch(error => {
                console.log('Error sending code:', error);
            });
        } catch (error) {
            console.error('Unexpected error:', error);
        }
    }
    function signUp() {
        if (password !== confirmPassword) {
            alert('密码和确认密码不一致');
            return;
        }
        
        try {
            signup(email, username, password, invitationCode, verificationCode).then(r => {
                console.log('注册成功:', r);
                alert('注册成功！');
                onClose(); // 关闭注册弹窗
            }).catch(error => {
                console.log('注册失败:', error);
                alert('注册失败，请检查输入信息');
            });
        } catch (error) {
            console.error('Unexpected error:', error);
        }
    }
        return (
            <div className={styles.root}>
                <div className={styles.center}>
                    <Button 
                        className={styles.closeButton}
                        type="text" 
                        icon={<CloseOutlined />} 
                        onClick={onClose}
                    />
                    <h1 className={styles.title}>账号注册</h1>

                    <div className={styles.inputs}>
                        <div className={styles.sub1}>
                            <p className={styles.smallTitle}>邮箱</p>
                            <Input size={"small"} variant={"outlined"} className={styles.input} onChange={(e) => setEmail(e.target.value)} placeholder="输入邮箱"></Input>
                            // 在邮箱输入框后添加用户名输入框
                            <p className={styles.smallTitle}>用户名</p>
                            <Input size={"small"} variant={"outlined"} className={styles.input} onChange={(e) => setUsername(e.target.value)} placeholder="输入用户名"></Input>
                            <p className={styles.smallTitle}>验证码</p>
                            <Input size={"small"} variant={"outlined"} className={styles.input} onChange={(e) => setVerificationCode(e.target.value)} placeholder="输入验证码"></Input>
                            <p className={styles.smallTitle}>邀请码</p>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Input size={"small"} variant={"outlined"} className={styles.codeInput} onChange={(e) => setInvitationCode(e.target.value)} placeholder="输入邀请码"></Input>
                                <Button className={styles.sendButton} onClick={() => sendCode()} style={{ marginLeft: '8px' }}>发送验证码</Button>
                            </div>
                            <p className={styles.smallTitle}>密码</p>
                            <Input.Password size={"small"} variant={"outlined"} className={styles.input} onChange={(e) => setPassword(e.target.value)} placeholder="输入密码"></Input.Password>
                            <p className={styles.smallTitle}>确认密码</p>
                            <Input.Password size={"small"} variant={"outlined"} className={styles.input} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="确认密码"></Input.Password>
                        </div>
                    </div>
                    <Checkbox className={styles.checkbox}>我已阅读并同意 《用户协议》《隐私协议》</Checkbox>
                    <Button disabled={isButtonDisabled} className={styles.signUpButton} type={"primary"} onClick={() => signUp()}>注册</Button>
                    
                    {/* 将返回登录的链接移到容器内部 */}
                    <div style={{ marginTop: '15px', textAlign: 'center' }}>
                        <span>已有账号？</span>
                        <Button type="link" onClick={onSwitchToLogin}>返回登录</Button>
                    </div>
                </div>
            </div>
        );
    }

export default SignUp