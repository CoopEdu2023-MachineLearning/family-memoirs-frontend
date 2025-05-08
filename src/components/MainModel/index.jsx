import React, { useRef, useState } from 'react';
import { Modal } from 'antd';
import { Typography } from 'antd';
import ForgetPwdForm from './Form';
import { verifyEmailCodeApi, resetPasswordApi } from '../../apis';
import { message } from 'antd';

function MainModel() {

    const { Link } = Typography

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const [pwdValue, setPwdValue] = useState('');
    const [confirmPwdValue, setConfirmPwdValue] = useState('');
    const [emailValue, setEmailValue] = useState('');
    const [emailCodeValue, setEmailCodeValue] = useState('');

    const formRef = useRef();

    const showModal = () => {
        setOpen(true);
    };

    // handle ok:
    // 1. 验证邮箱是否格式正确 (non-req) / 存在 (存在后发送验证码)
    // 2. 验证验证码是否正确/过期 (req)
    // 3. 验证密码是否一致 (放在 Rule 里)
    // 4. 重置密码 (req)
    // 5. 成功后再关闭弹窗
    function handleOk() {
        formRef.current.validateForm()
            .then(() => {
                message.success('验证码已发送，请注意查收!');
                setLoading(true);
                verifyEmailCodeApi(emailValue, emailCodeValue)
                    .then(() => {
                        resetPasswordApi(emailValue, pwdValue)
                            .then(() => {
                                message.success('密码重置成功!');
                                setLoading(false);
                                setOpen(false);
                            })
                            .catch((error) => {
                                message.error(`密码重置失败! (${error})`);
                                setLoading(false);
                            })
                    })
                    .catch((error) => {
                        message.error(`验证码错误或已过期! (${error})`);
                        setLoading(false);
                    })
            })
    }

    const handleCancel = () => {
        setOpen(false);
    };

    return (
        <>
            <Link
                onClick={showModal}>
                忘记密码
            </Link>
            <Modal
                title="忘记密码"
                open={open}
                onOk={handleOk}
                confirmLoading={loading}
                onCancel={handleCancel}
                cancelText="取消"
                okText="确定"
            >
                <ForgetPwdForm
                    ref={formRef}
                    emailValue={emailValue}
                    pwdValue={pwdValue}
                    confirmPwdValue={confirmPwdValue}
                    emailCodeValue={emailCodeValue}
                    setPwdValue={setPwdValue}
                    setConfirmPwdValue={setConfirmPwdValue}
                    setEmailValue={setEmailValue}
                    setEmailCodeValue={setEmailCodeValue}
                />
            </Modal>
        </>
    );
};

export default MainModel;