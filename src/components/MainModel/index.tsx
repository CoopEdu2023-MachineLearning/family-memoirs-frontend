import React, { useState } from 'react';
import { Modal } from 'antd';
import { Typography } from 'antd';
import ForgetPwdForm from './Form';

function MainModel() {

    const { Link } = Typography

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const [pwdValue, setPwdValue] = useState('');
    const [confirmPwdValue, setConfirmPwdValue] = useState('');
    const [emailCodeValue, setEmailCodeValue] = useState('');

    const showModal = () => {
        setOpen(true);
    };

    const handleOk = () => {
        setLoading(true);
        setTimeout(() => {
            setOpen(false);
            setLoading(false);
        }, 2000);
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };

    return (
        <>
            <Link
                onClick={showModal}>
                重置密码
            </Link>
            <Modal
                title="重置密码"
                open={open}
                onOk={handleOk}
                confirmLoading={loading}
                onCancel={handleCancel}
                cancelText="取消"
                okText="确定"
            >
                <ForgetPwdForm
                    pwdValue={pwdValue}
                    confirmPwdValue={confirmPwdValue}
                    emailCodeValue={emailCodeValue}
                    setPwdValue={setPwdValue}
                    setConfirmPwdValue={setConfirmPwdValue}
                    setEmailCodeValue={setEmailCodeValue}
                />
            </Modal>
        </>
    );
};

export default MainModel;