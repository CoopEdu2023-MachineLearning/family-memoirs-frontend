import React, { useState } from "react";
import { Upload, Button, Input, Form, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const UploadArticle = () => {
    const [fileList, setFileList] = useState([]);

    const handleUpload = () => {
        if (fileList.length === 0) {
            message.error("请先上传文件！");
            return;
        }
        message.success("文章上传成功！");
        // 在这里可以添加上传逻辑，例如调用后端接口
    };

    const handleChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };

    return (
        <div style={{ maxWidth: 600, margin: "0 auto", padding: "20px" }}>
            <Form layout="vertical">
                <Form.Item label="文章标题" name="title" rules={[{ required: true, message: "请输入文章标题" }]}>
                    <Input placeholder="请输入文章标题" />
                </Form.Item>
                <Form.Item label="上传文章" name="upload">
                    <Upload
                        fileList={fileList}
                        onChange={handleChange}
                        beforeUpload={() => false} // 阻止自动上传
                    >
                        <Button icon={<UploadOutlined />}>点击上传</Button>
                    </Upload>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" onClick={handleUpload}>
                        提交
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default UploadArticle;