import React, { useState } from 'react';
import { Upload, Button, message, Space, Progress } from 'antd';
import { SoundOutlined, CloseOutlined, UploadOutlined } from '@ant-design/icons';
import http from '../../../http';
import { uploadFileApi } from '../../../apis';

function AudioComponent({ audioId, setAudioId, audioUrl, setAudioUrl, articleId }) {
    const [uploadingAudio, setUploadingAudio] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    const handleOnChange = (info) => {
        const { file } = info;

        if (file.status === 'uploading') {
            setUploadingAudio(true);
            setUploadProgress(file.percent || 0);
            return;
        }

        if (file.status === 'done') {
            setUploadingAudio(false);
            setUploadProgress(0);

            if (file.response && file.response.id && file.response.url) {
                setAudioId(file.response.id);
                setAudioUrl(file.response.url);
                message.success('上传成功');
            } else {
                message.error('上传成功，但返回数据不完整');
                console.error('上传响应数据不完整:', file.response);
            }
            return;
        }

        if (file.status === 'error') {
            setUploadingAudio(false);
            setUploadProgress(0);
            const errorMsg = file.error?.message || file.response?.message || '上传失败';
            message.error(errorMsg);
            console.error('上传错误:', file.error || file.response);
        }
    };

    const handleError = (error) => {
        setUploadingAudio(false);
        setUploadProgress(0);
        const errorMsg = error.message || '上传失败';
        message.error(errorMsg);
        console.error('上传错误:', error);
    };

    const handleRemove = async () => {
        if (uploadingAudio) {
            message.warning('文件正在上传中，无法删除');
            return false;
        }

        if (!audioId) {
            setAudioId(null);
            setAudioUrl(null);
            return true;
        }

        try {
            await http.delete(`/files/${audioId}`);
            setAudioId(null);
            setAudioUrl(null);
            message.success('删除成功');
            return true;
        } catch (error) {
            message.error(`删除失败：${error.message}`);
            console.error('删除错误:', error);
            return false;
        }
    };

    const customRequest = async ({ file, onProgress, onSuccess, onError }) => {
        setUploadingAudio(true);

        try {
            const response = await uploadFileApi(file, {
                onUploadProgress: (progressEvent) => {
                    const percent = Math.min(99, Math.round(
                        (progressEvent.loaded * 100) / progressEvent.total
                    ));
                    onProgress({ percent });
                    setUploadProgress(percent);
                }
            });

            // 确保上传完成状态
            onProgress({ percent: 100 });
            setUploadProgress(100);

            // 必须包含 status: 'done'
            onSuccess({
                ...response.data,
                status: 'done'
            }, file);

        } catch (error) {
            onProgress({ percent: 0 });
            setUploadProgress(0);
            onError(error);
        } finally {
            setUploadingAudio(false);
        }
    };

    return (
        <>
            {audioUrl && (
                <div style={{ marginBottom: 16, position: 'relative' }}>
                    <div style={{ border: '1px solid #d9d9d9', borderRadius: 4, padding: 12 }}>
                        <Space align="center">
                            <SoundOutlined style={{ fontSize: 20, color: '#1890ff' }} />
                            <audio controls style={{ width: 'calc(100% - 40px)' }} src={audioUrl} />
                        </Space>
                    </div>
                    <Button
                        type="text"
                        icon={<CloseOutlined />}
                        onClick={handleRemove}
                        style={{ position: 'absolute', right: -8, top: -8, zIndex: 10 }}
                    />
                </div>
            )}

            {uploadingAudio && (
                <div style={{ marginBottom: 16 }}>
                    <Progress percent={uploadProgress} status="active" />
                </div>
            )}

            <Upload
                accept="audio/*"
                fileList={audioId ? [{
                    uid: audioId,
                    status: 'done',
                    name: audioUrl?.split('/').pop() || 'audio-file',
                    response: { id: audioId, url: audioUrl }
                }] : []}
                onChange={handleOnChange}
                onRemove={handleRemove}
                onError={handleError}
                showUploadList={false}
                customRequest={customRequest}
            >
                <Button
                    icon={<UploadOutlined />}
                    disabled={uploadingAudio}
                >
                    {uploadingAudio ? `上传中... ${uploadProgress}%` : '上传音频（最大 100MB）'}
                </Button>
            </Upload>
        </>
    );
}

export default AudioComponent;