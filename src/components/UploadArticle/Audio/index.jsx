import React, { useState } from 'react';
import { Upload, Button, message, Space } from 'antd';
import { SoundOutlined, CloseOutlined, UploadOutlined } from '@ant-design/icons';
import http from '../../../http';

function AudioComponent({ audioId, setAudioId, audioUrl, setAudioUrl, articleId }) {

    const [uploadingAudio, setUploadingAudio] = useState(false);

    const handleOnChange = ({ file }) => {
        if (file.status === 'uploading') {
            setUploadingAudio(true);
        } else if (file.status === 'done') {
            setUploadingAudio(false);
            setAudioId(file.response.id);
            setAudioUrl(file.response.url);
        } else if (file.status === 'error' || file.error) {
            setUploadingAudio(false);
            message.error('上传失败');
        }
    };

    const handleError = (error) => {
        setUploadingAudio(false);
        message.error(`上传失败: ${error.message || '未知错误'}`);
    };

    const handleRemove = () => {
        if (uploadingAudio) {
            message.warning('文件正在上传中，无法删除');
            return false;
        }

        if (audioId) {
            return http.delete(`/files/${audioId}`)
                .then(() => {
                    setAudioId(null);
                    setAudioUrl(null);
                    return true;
                })
                .catch(error => {
                    message.error(`删除失败：${error.message}`);
                    return false;
                });
        } else {
            setAudioId(null);
            setAudioUrl(null);
            return true;
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
                action={`/files/${articleId}/upload`}
                beforeUpload={() => {
                    setUploadingAudio(true);
                    return true;
                }}
            >
                <Button
                    icon={<UploadOutlined />}
                    disabled={uploadingAudio}
                >
                    {uploadingAudio ? '上传中...' : '上传音频（最大 100MB）'}
                </Button>
            </Upload>
        </>
    );
}

export default AudioComponent;
