import React, { useRef, useState } from 'react';
import { Button, Modal } from 'antd';
import ForgetPwdForm from './Form';
import { verifyEmailCodeApi, resetPasswordApi } from '../../apis';
import { message } from 'antd';

import styles from './index.module.scss';

function ForgetPwdModel() {

    const [open, setOpen] = useState(true);
    const [loading, setLoading] = useState(false);

    const [pwdValue, setPwdValue] = useState('');
    const [confirmPwdValue, setConfirmPwdValue] = useState('');
    const [emailValue, setEmailValue] = useState('');
    const [emailCodeValue, setEmailCodeValue] = useState('');

    const formRef = useRef();
    const [formKey, setFormKey] = useState(0);

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
        setFormKey(prev => prev + 1)
        setOpen(false);
    };


    return (
        <>
            <Modal
                centered
                className={styles.modal}
                title="忘记密码"
                open={open}
                confirmLoading={loading}
                onCancel={handleCancel}
                footer={[
                    <Button
                        className='confirm-btn'
                        color="default"
                        variant="solid"
                        key="submit"
                        onClick={handleOk}
                        autoInsertSpaceInButton={false}
                    >
                        <span style={{ letterSpacing: 0 }}>{'继'}{'续'}</span>
                    </Button>
                ]}
            >
                <ForgetPwdForm
                    clearOnDestroy={true}
                    key={formKey}
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