import { Button, message } from 'antd';
import { useEffect, useState } from 'react';

import MainNarrator from './MainNarrator';
import OtherNarrators from './OtherNarrators';
import Audio from './Audio';
import Context from './Context';
import Location from './Location';

import http from '../../http';
import Time from './Time';
import TagBox from './TagBox';

function UploadArticle(articleId) {
    const [mainNarrator, setMainNarrator] = useState('');
    const [otherNarrators, setOtherNarrators] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [audioList, setAudioList] = useState([]);
    const [buttonIsDisabled, setButtonIsDisabled] = useState(false);
    const [location, setLocation] = useState('');
    const [time, setTime] = useState(null);
    const [context, setContext] = useState('');
    const [intro, setIntro] = useState('');

    useEffect(() => {
        http.get(`/article/${articleId}/get`)
            .then((res) => {
                setTitle(res.title);
                setIntro(res.intro);
                setMainNarrator(res.mainNarrator);
            })
            .catch(error =>
                message.error(`无法获取已保存的记录: ${error.message}`)
            );
    }, []);

    const submit = () => {
        const data = {
            title,
            intro,
        };

        http.post(`/article/${articleId}/upload`, data)
            .then(() => {
                message.success('上传成功！');
                clearData();
                setTimeout(() => window.location.reload(), 2000);
            })
            .catch(error => message.error(`上传失败: ${error.message}`));
    };

    const clearData = () => {
        setTitle('');
        setIntro('');
    };

    return (
        <>
            <div style={{ margin: '20px 0' }}>
                该故事讲述者为：
                <MainNarrator
                    mainNarrator={mainNarrator}
                    setMainNarrator={setMainNarrator}
                />
            </div>

            <div style={{ margin: '20px 0' }}>
                该故事关联的其他讲述者：
                <OtherNarrators
                    otherNarrators={otherNarrators}
                    setOtherNarrators={setOtherNarrators}
                />
            </div>

            <div style={{ margin: '20px 0' }}>
                <Audio
                    audioList={audioList}
                    setAudioList={setAudioList}
                    articleId={articleId}
                    setUploading={setUploading}
                />
            </div>

            <div style={{ margin: '20px 0' }}>
                <div>时间</div>
                <Time time={time} setTime={setTime} />
            </div>

            <div style={{ margin: '20px 0' }}>
                <div>地点</div>
                <Location location={location} setLocation={setLocation} />
            </div>

            <div style={{ margin: '20px 0' }}>
                <div>正文</div>
                <Context context={context} setContext={setContext} />
            </div>

            <div style={{ margin: '20px 0' }}>
                <div>标签</div>
                <TagBox />
            </div>

            <Button
                type="primary"
                disabled={buttonIsDisabled}
            >
                上传
            </Button>
            <Button
                disabled={buttonIsDisabled}
            >
                取消
            </Button>

        </>
    );
}

export default UploadArticle;
