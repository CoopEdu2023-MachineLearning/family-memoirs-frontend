import React, { useState } from 'react';
import { DatePicker, Select } from 'antd';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;
const { Option } = Select;

const decades = [];
for (let y = 1900; y <= 2020; y += 10) {
    decades.push({
        label: `${y}s`,
        start: dayjs(`${y}-01-01`),
        end: dayjs(`${y + 9}-12-31`),
    });
}

function Time() {
    const [range, setRange] = useState(null);

    const onSelectDecade = (value) => {
        const decade = decades.find(d => d.label === value);
        if (decade) {
            setRange([decade.start, decade.end]);
        }
    };

    return (
        <>
            <Select
                style={{ width: 120, marginRight: 12 }}
                placeholder="选择年代"
                onChange={onSelectDecade}
                allowClear
            >
                {decades.map(d => (
                    <Option key={d.label} value={d.label}>{d.label}</Option>
                ))}
            </Select>
            <RangePicker
                value={range}
                onChange={dates => setRange(dates)}
                style={{ width: 300 }}
                placeholder={['开始时间', '结束时间']}
            />
        </>
    );
}

export default Time;
