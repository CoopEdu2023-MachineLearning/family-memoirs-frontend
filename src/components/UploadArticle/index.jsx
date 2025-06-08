import { Tag, Button, message } from 'antd';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

import MainNarrator from './MainNarrator';
import OtherNarrators from './OtherNarrators';
import Context from './Context';
import Location from './Location';
import Time from './Time';
import TagBox from './TagBox';
import AudioComponent from './Audio';

import { createArticleApi, uploadArticleApi } from '../../apis';

function UploadArticle() {

    const [articleId, setArticleId] = useState(-1);

    useEffect(() => {
        createArticleApi()
            .then(response => {
                setArticleId(response.data.id);
            })
            .catch(error => {
                message.error(`创建文章失败: ${error.message}`)
                // setTimeout(() => window.location.reload(), 2000);
            });
    }, []);

    const [mainNarrator, setMainNarrator] = useState('');
    const [otherNarrators, setOtherNarrators] = useState([]);
    const [audioId, setAudioId] = useState(null);
    const [audioUrl, setAudioUrl] = useState('');
    const [buttonIsDisabled, setButtonIsDisabled] = useState(false);
    const [location, setLocation] = useState('');
    const [context, setContext] = useState('');
    const [timeFilter, setTimeFilter] = useState({
        type: null,
        decade: null,
        dateRange: [null, null]
    });

    const submit = () => {

        const era = timeFilter.decade
        const startYear = dayjs(timeFilter.dateRange[0]).format('YYYY')
        const endYear = dayjs(timeFilter.dateRange[1]).format('YYYY')
        const startMonth = dayjs(timeFilter.dateRange[0]).format('MM')
        const endMonth = dayjs(timeFilter.dateRange[1]).format('MM')

        const data = {
            mainNarrator,
            otherNarrators,
            audioId,
            location,
            context,
            era,
            startYear,
            endYear,
            startMonth,
            endMonth,
        };

        console.log(data)

        uploadArticleApi(articleId, data)
            .then(() => {
                message.success('上传成功！');
                clearData();
                setTimeout(() => window.location.reload(), 2000);
            })
            .catch(error => message.error(`上传失败: ${error.message}`));
    };

    const clearData = () => {
        setContext('')
        setLocation('')
        setTime(null)
        setMainNarrator('')
        setOtherNarrators([])
        setAudioList([])
    };

    return (
        <>
            <div style={{ margin: '20px 0' }}>
                <Tag color="blue">主要讲述者</Tag>
                <br />
                <MainNarrator
                    mainNarrator={mainNarrator}
                    setMainNarrator={setMainNarrator}
                />
            </div>

            <div style={{ margin: '20px 0' }}>
                <Tag color="blue" style={{ margin: '10px 0' }}>其他讲述者</Tag>
                <br />
                <OtherNarrators
                    otherNarrators={otherNarrators}
                    setOtherNarrators={setOtherNarrators}
                />
            </div>

            <div style={{ margin: '20px 0' }}>
                <Tag color="blue" style={{ margin: '10px 0' }}>音频附件</Tag>
                <br />
                <AudioComponent
                    audioId={audioId}
                    setAudioId={setAudioId}
                    audioUrl={audioUrl}
                    setAudioUrl={setAudioUrl}
                    articleId={articleId}
                />
            </div>

            <div style={{ margin: '20px 0' }}>
                <Tag color="blue" style={{ margin: '10px 0' }}>时间</Tag>
                <br />
                <Time
                    timeFilter={timeFilter}
                    setTimeFilter={setTimeFilter}
                />
            </div>

            <div style={{ margin: '20px 0' }}>
                <Tag color="blue" style={{ margin: '10px 0' }}>地点</Tag>
                <br />
                <Location location={location} setLocation={setLocation} />
            </div>

            <div style={{ margin: '20px 0' }}>
                <Tag color="blue" style={{ margin: '10px 0' }}>正文</Tag>
                <br />
                <Context context={context} setContext={setContext} />
            </div>

            <div style={{ margin: '20px 0' }}>
                <Tag color="blue" style={{ margin: '10px 0' }}>标签</Tag>
                <br />
                <TagBox />
            </div>

            <Button
                type="primary"
                disabled={buttonIsDisabled}
                onClick={submit}
            >
                上传
            </Button>
            <Button
                disabled={buttonIsDisabled}
                onClick={clearData}
            >
                取消
            </Button>

        </>
    );
}

export default UploadArticle;
