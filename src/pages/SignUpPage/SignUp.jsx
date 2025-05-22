import styles from './SignUp.module.scss';
import {Button, Input, Space} from 'antd';
import { useEffect, useState } from "react";
import { getEmailCodeApi } from "@apis/getEmailCodeApi/index.js";
import { signup } from "@apis/signUpApi/index.js";
import Checkbox from "antd/es/checkbox/Checkbox";
import Card from "@components/CardComponent/index.jsx";

function signUp() {
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState()
    const [email, setEmail] = useState()
    const [invitationCode, setInvitationCode] = useState()
    const [verificationCode, setVerificationCode] = useState()
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
        try {
            signup(email, username, password, invitationCode, verificationCode).then(r => {
                console.log(r);
            }).catch(error => {
                console.log('Error sending code:', error);
            });
        } catch (error) {
            console.error('Unexpected error:', error);
        }
    }
        return (
            <div className={styles.root}>
                <div className={styles.center}>
                    <h1 className={styles.title}>账号注册</h1>
                    <div className={styles.inputs}>
                        <div className={styles.sub1}>
                            <p className={styles.smallTitle}>邮箱</p>
                            <Input size={"small"} variant={"outlined"} className={styles.input} onChange={(e) => setEmail(e.target.value)} placeholder="输入邮箱"></Input>
                            <p className={styles.smallTitle}>验证码</p>
                            <Input size={"small"} variant={"outlined"} className={styles.input} onChange={(e) => setVerificationCode(e.target.value)} placeholder="输入验证码"></Input>
                            <p className={styles.smallTitle}>邀请码</p>
                            <Input size={"small"} variant={"outlined"} className={styles.input} onChange={(e) => setInvitationCode(e.target.value)} placeholder="输入邀请码"></Input>
                            <p className={styles.smallTitle}>密码</p>
                            <Input.Password size={"small"} variant={"outlined"} className={styles.input} onChange={(e) => setPassword(e.target.value)} placeholder="输入密码"></Input.Password>
                            <p className={styles.smallTitle}>确认密码</p>
                            <Input.Password size={"small"} variant={"outlined"} className={styles.input} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="确认密码"></Input.Password>
                        </div>
                    </div>
                    <Checkbox className={styles.checkbox}>我已阅读并同意 《用户协议》《隐私协议》</Checkbox>
                    <Button className={styles.signUpButton} type={"primary"} onClick={() => signUp()}>注册</Button>
                </div>


            </div>
        );
    }

export default signUp