import { Tag, Button, message } from 'antd';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

import MainNarrator from './MainNarrator';
import OtherNarrators from './OtherNarrators';
import Context from './Context';
import Location from './Location';
import Time from './Time';
import AudioComponent from './Audio';

import { createArticleApi, uploadArticleApi } from '../../apis';

function UploadArticle() {

    const [articleId, setArticleId] = useState(-1);

    useEffect(() => {
        createArticleApi()
            .then(id => {
                setArticleId(id);
            })
            .catch(error => {
                message.error(`创建文章失败: ${error.message}`)
                setTimeout(() => window.location.reload(), 2000);
            });
    }, []);

    const [userId, setUserId] = useState(-1);
    const [description, setDescription] = useState('');

    const [mainNarratorId, setMainNarratorId] = useState('');
    const [otherNarratorIds, setOtherNarratorIds] = useState([]);
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

        const era = timeFilter.decade;

        const startDate = timeFilter.dateRange && timeFilter.dateRange[0];
        const endDate = timeFilter.dateRange && timeFilter.dateRange[1];

        const startYear = startDate ? dayjs(startDate).format('YYYY') : '-1';
        const endYear = endDate ? dayjs(endDate).format('YYYY') : '-1';
        const startMonth = startDate ? dayjs(startDate).format('MM') : '-1';
        const endMonth = endDate ? dayjs(endDate).format('MM') : '-1';

        const tellerId = mainNarratorId
        const otherTellerIds = otherNarratorIds.join(',')
        const text = context

        const data = {
            userId,
            description,
            tellerId,
            otherTellerIds,
            audioId,
            location,
            text,
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
        setUserId('')
        setMainNarratorId('')
        setOtherNarratorIds([])
        setContext('')
        setLocation('')
        setTimeFilter({
            type: null,
            decade: null,
            dateRange: [null, null]
        });
        setAudioId(null)
        setAudioUrl('')
    };

    return (
        <>
            <div style={{ margin: '20px 0' }}>
                <Tag color="blue">主要讲述者</Tag>
                <br />
                <MainNarrator
                    mainNarratorId={mainNarratorId}
                    setMainNarratorId={setMainNarratorId}
                />
            </div>

            <div style={{ margin: '20px 0' }}>
                <Tag color="blue" style={{ margin: '10px 0' }}>其他讲述者</Tag>
                <br />
                <OtherNarrators
                    otherNarratorIds={otherNarratorIds}
                    setOtherNarratorIds={setOtherNarratorIds}
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

            {/* <div style={{ margin: '20px 0' }}>
                <Tag color="blue" style={{ margin: '10px 0' }}>标签</Tag>
                <br />
                <TagBox />
            </div> */}

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
