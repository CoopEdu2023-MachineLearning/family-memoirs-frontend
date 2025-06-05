import React from 'react';
import { DatePicker, Select } from 'antd';

const { RangePicker } = DatePicker;
const { Option } = Select;

const decades = [];
for (let y = 1900; y <= 2020; y += 10) {
    decades.push({
        label: `${y}s`,
    });
}

function Time({ timeFilter, setTimeFilter }) {

    const onSelectDecade = (decadeLabel) => {
        setTimeFilter({
            type: decadeLabel ? 'decade' : null,
            decade: decadeLabel,
            dateRange: [null, null]
        });
    };

    const onDateChange = (dates) => {
        setTimeFilter({
            type: dates ? 'range' : null,
            decade: null,
            dateRange: dates
        });
    };

    return (
        <>
            <Select
                style={{ width: 120, marginRight: 12 }}
                placeholder="选择年代"
                onChange={onSelectDecade}
                allowClear
                value={timeFilter.decade}
                disabled={timeFilter.type === 'range'}
            >
                {decades.map(d => (
                    <Option key={d.label} value={d.label}>{d.label}</Option>
                ))}
            </Select>

            <RangePicker
                picker="month"
                value={timeFilter.dateRange}
                onChange={onDateChange}
                style={{ width: 300 }}
                placeholder={['开始时间', '结束时间']}
                disabled={timeFilter.type === 'decade'}
            />
        </>
    );
}

export default Time;