import React, { forwardRef } from 'react';
import { Button, Form, Input, Space, message } from 'antd';
import { getEmailCodeApi } from '../../../apis';

const ForgetPwdForm = forwardRef(({
    setPwdValue,
    setConfirmPwdValue,
    setEmailValue,
    setEmailCodeValue,
    pwdValue,
    confirmPwdValue,
    emailValue,
    emailCodeValue,
}, ref) => {

    const [form] = Form.useForm();

    React.useImperativeHandle(ref, () => ({
        validateForm: () => {
            return form.validateFields();
        },
    }));

    const [getCodeText, setGetCodeText] = React.useState('点击发送验证码');
    const [disabled, setDisabled] = React.useState(false);

    function resetGetCodeButton() {
        setDisabled(false);
        setGetCodeText('点击发送验证码');
    }

    function handleGetCode() {
        let time = 60;
        setDisabled(true);

        getEmailCodeApi(emailValue)
            .then(() => {
                message.success('验证码已发送，请注意查收!');
                startCountdown(time);
            })
            .catch((error) => {
                resetGetCodeButton();
                message.error(`获取验证码失败! (${error})`);
            });

    }

    function startCountdown(time) {
        setGetCodeText('重新获取 (' + time + 's)');
        const timer = setInterval(() => {
            time--;
            setGetCodeText('重新获取 (' + time + 's)');
            if (time === 0) {
                resetGetCodeButton();
                clearInterval(timer);
            }
        }, 1000);
    }

    return (
        <>
            <Form
                labelCol={{ style: { textAlign: "left", width: "28.83vw", margin: "0 auto" } }}
                wrapperCol={{ align: 'center' }}
                colon={false}
                requiredMark={false}
                layout='vertical'
                form={form}
                name="basic"
            >
                <Form.Item
                    label="邮箱"
                    name="email"
                    rules={[{ required: true, message: '请输入邮箱' },
                    { type: 'email', message: '请输入有效的邮箱地址' }]}
                >
                    <Input
                        value={emailValue}
                        onChange={(e) => setEmailValue(e.target.value)}
                    />
                </Form.Item>

                <Form.Item
                    label="验证码"
                    name="emailCode"
                    rules={[
                        { required: true, message: '请输入邮箱验证码' },
                        { min: 0, max: 6, message: '验证码长度不能超过6位' }
                    ]}
                >
                    <div className='email-code-container'>
                        <Input
                            className='email-code-input'
                            value={emailCodeValue}
                            onChange={(e) => setEmailCodeValue(e.target.value)}
                        />
                        <Button
                            className='send-code-btn'
                            color="default"
                            variant="solid"
                            onClick={handleGetCode}
                            disabled={disabled}
                        >
                            {getCodeText}
                        </Button>
                    </div>
                </Form.Item>

                <Form.Item
                    label="密码"
                    name="password"
                    rules={[{ required: true, message: '请输入密码' }]}
                >
                    <Input.Password
                        value={pwdValue}
                        onChange={(e) => setPwdValue(e.target.value)}
                    />
                </Form.Item>

                <Form.Item
                    label="确认密码"
                    name="passwordConfirm"
                    rules={[{ required: true, message: '请再次输入密码' },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('两次输入的密码不匹配'));
                        },
                    }),
                    ]}
                >
                    <Input.Password
                        value={confirmPwdValue}
                        onChange={(e) => setConfirmPwdValue(e.target.value)}
                    />
                </Form.Item>
            </Form>
        </>
    )
})

export default ForgetPwdForm;