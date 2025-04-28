import React from 'react';
import { Button, Form, Input, Space } from 'antd';

type FieldType = {
    emailCode?: string;
    password?: string;
    passwordConfirm?: string;
};

interface ForgetPwdFormProps {
    setPwdValue: (value: string) => void;
    setConfirmPwdValue: (value: string) => void;
    setEmailCodeValue: (value: string) => void;
    pwdValue: string;
    confirmPwdValue: string;
    emailCodeValue: string;

}

function ForgetPwdForm({ pwdValue, confirmPwdValue, emailCodeValue, setPwdValue, setConfirmPwdValue, setEmailCodeValue }: ForgetPwdFormProps) {

    const [getCodeText, setGetCodeText] = React.useState('获取验证码');
    const [disabled, setDisabled] = React.useState(false);

    function handleGetCode() {
        let time = 5;
        setDisabled(true);

        setGetCodeText('重新获取 (' + time + 's)');
        const timer = setInterval(() => {
            time--;
            setGetCodeText('重新获取 (' + time + 's)');
            if (time === 0) {
                setDisabled(false);
                clearInterval(timer);
                setGetCodeText('获取验证码');
            }
        }, 1000);
    }

    return (
        <>
            <Form
                name="basic"
                labelCol={{ span: 7 }}
                wrapperCol={{ span: 15 }}
                style={{ maxWidth: 600, margin: '3vh auto' }}
            >
                <Form.Item<FieldType>
                    label="邮箱验证码"
                    name="emailCode"
                    rules={[{ required: true, message: '请输入邮箱验证码' }]}
                >
                    <Space.Compact style={{ width: '100%' }}>
                        <Input
                            value={emailCodeValue}
                            onChange={(e) => setEmailCodeValue(e.target.value)}
                        />
                        <Button
                            type="primary"
                            onClick={handleGetCode}
                            disabled={disabled}
                        >
                            {getCodeText}
                        </Button>
                    </Space.Compact>
                </Form.Item>

                <Form.Item<FieldType>
                    label="密码"
                    name="password"
                    rules={[{ required: true, message: '请输入密码' }]}
                >
                    <Input.Password
                        value={pwdValue}
                        onChange={(e) => setPwdValue(e.target.value)}
                    />
                </Form.Item>

                <Form.Item<FieldType>
                    label="确认密码"
                    name="passwordConfirm"
                    rules={[{ required: true, message: '请再次输入密码' }]}
                >
                    <Input.Password
                        value={confirmPwdValue}
                        onChange={(e) => setConfirmPwdValue(e.target.value)}
                    />
                </Form.Item>
            </Form>
        </>
    )
}

export default ForgetPwdForm;