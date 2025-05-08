import React, { useRef, useState } from 'react';
import { Modal } from 'antd';
import { Typography } from 'antd';
import ForgetPwdForm from './Form';
import { verifyEmailCodeApi, resetPasswordApi } from '../../apis';
import { message } from 'antd';

function ForgetPwdModel() {

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

    function handleOk() {
        formRef.current.validateForm()
            .then(() => {
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

export default ForgetPwdModel;