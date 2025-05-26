import { Upload, Button, message, Typography } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import http from '../../../http';

const { Title } = Typography;

function Audio({ audioList, setAudioList, articleId, setUploading }) {

    function handleOnChange({ fileList }) {
        const newAudioList = [...fileList];
        newAudioList.forEach(audio => {
            audio.preview = true;
        });
        setAudioList(newAudioList);
    };

    function handleOnSuccess() {
        setUploading(false);
    }

    function handleRemove(audioItem) {
        if (audioItem.status !== 'done' && audioItem.status !== undefined) {
            return true;
        }
        return http.delete(`/files/${audioItem.response?.id || audioItem.uid}`)
            .then(() => true)
            .catch(error => {
                message.error(`删除失败：${error.message}`);
                return false;
            });
    }

    return (
        <>
            <Title level={5}>Audio</Title>
            <Upload
                multiple
                accept="audio/*"
                fileList={audioList}
                onChange={handleOnChange}
                onRemove={handleRemove}
                showUploadList={{ showRemoveIcon: true }}
                action={`/files/${articleId}/upload`}
                beforeUpload={() => {
                    setUploading(true);
                    return true;
                }}
                onSuccess={handleOnSuccess}
            >
                <Button
                    icon={<UploadOutlined />}
                    style={{ margin: '10px 0' }}
                >
                    上传音频（最大 100MB）
                </Button>
            </Upload>
        </>
    );
}

export default Audio;
