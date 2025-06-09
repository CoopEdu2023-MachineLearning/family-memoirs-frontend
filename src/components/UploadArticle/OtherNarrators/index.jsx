import React, { useState, useEffect } from 'react';
import { AutoComplete, Input, Spin, Typography, message } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { findNarratorApi } from '../../../apis';

function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const timer = setTimeout(() => setDebouncedValue(value), delay);
        return () => clearTimeout(timer);
    }, [value, delay]);
    return debouncedValue;
}

function OtherNarrators({ otherNarratorIds, setOtherNarratorIds }) {
    const [inputValue, setInputValue] = useState('');
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [userCache, setUserCache] = useState({}); // 缓存用户信息 {id: user}

    const debouncedSearch = useDebounce(inputValue, 500);

    useEffect(() => {
        if (debouncedSearch) {
            setLoading(true);
            findNarratorApi(debouncedSearch)
                .then((res) => {
                    setOptions([{
                        label: res.nameOld,
                        value: res.id, // 存储ID作为value
                        user: res,    // 保留完整用户信息用于缓存
                    }]);
                })
                .catch((error) => {
                    message.error(`${error.message}`);
                    setOptions([{
                        value: 'no-result',
                        label: <Typography.Text type="secondary">没有找到用户... TwT</Typography.Text>,
                        disabled: true,
                    }]);
                })
                .finally(() => setLoading(false));
        } else {
            setOptions([]);
        }
    }, [debouncedSearch]);

    const handleSearch = (value) => setInputValue(value);

    const handleSelect = (value, option) => {
        if (option.user && !otherNarratorIds.includes(option.user.id)) {
            setOtherNarratorIds([...otherNarratorIds, option.user.id]);
            setUserCache(prev => ({ ...prev, [option.user.id]: option.user }));
        }
        setInputValue('');
        setOptions([]);
    };

    const handleRemove = (id) => {
        setOtherNarratorIds(otherNarratorIds.filter(itemId => itemId !== id));
    };

    return (
        <>
            <AutoComplete
                style={{ width: 200 }}
                options={loading ? [{
                    value: 'loading',
                    label: <div style={{ textAlign: 'center' }}><Spin size="small" /></div>,
                    disabled: true,
                }] : options}
                onSearch={handleSearch}
                onSelect={handleSelect}
                value={inputValue}
                allowClear
            >
                <Input prefix={<SearchOutlined />} placeholder="搜索用户" />
            </AutoComplete>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 12 }}>
                {otherNarratorIds.map(id => {
                    const narrator = userCache[id];
                    return (
                        <div
                            key={id}
                            style={{
                                background: '#f0f0f0',
                                borderRadius: 4,
                                padding: '4px 8px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 4,
                            }}
                        >
                            <span>{narrator?.nameOld || '加载中...'}</span>
                            <span
                                style={{ cursor: 'pointer', color: '#999' }}
                                onClick={() => handleRemove(id)}
                            >
                                ×
                            </span>
                        </div>
                    );
                })}
            </div>
        </>
    );
}

export default OtherNarrators;