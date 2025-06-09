import { useEffect, useState } from 'react';
import { Select, message } from 'antd';
import getNarratorListApi from '../../../apis/getNarratorListApi';

function MainNarrator({ mainNarratorId, setMainNarratorId }) {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        getNarratorListApi()
            .then((data) => {
                const formattedList = data.map((item) => ({
                    label: item.nameOld,
                    value: item.id,
                    ...item
                }));
                setList(formattedList);
            })
            .catch((error) => {
                message.error(`获取讲述者失败：${error.message}`);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const handleSelect = (selectedOption) => {
        setMainNarratorId(selectedOption.value);
    };

    return (
        <Select
            labelInValue
            value={{
                value: mainNarratorId,
                label: list.find(item => item.value === mainNarratorId)?.label || null
            }}
            placeholder="选择主要的讲述者"
            style={{ width: 180, margin: '10px 0' }}
            onSelect={handleSelect}
            loading={loading}
            allowClear
        >
            {list.map((item) => (
                <Select.Option key={item.value} value={item.value}>
                    {item.label}
                </Select.Option>
            ))}
        </Select>
    );
}

export default MainNarrator;