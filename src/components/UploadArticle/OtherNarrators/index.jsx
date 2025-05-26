import React, { useState, useEffect } from 'react';
import { AutoComplete, Input, Spin, Typography } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import http from '../../../http';

function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedValue(value), delay);
        return () => clearTimeout(timer);
    }, [value, delay]);

    return debouncedValue;
}

function OtherNarrators({ otherNarrators, setOtherNarrators }) {
    const [inputValue, setInputValue] = useState('');
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(false);

    const debouncedSearch = useDebounce(inputValue, 500);

    useEffect(() => {
        if (debouncedSearch) {
            setLoading(true);
            http
                .get(`/users/find`, { params: { name: debouncedSearch } })
                .then((res) => {
                    setOptions([
                        {
                            value: res.defaultName,
                            label: res.defaultName,
                            user: res,
                        },
                    ]);
                })
                .catch(() => {
                    setOptions([
                        {
                            value: 'no-result',
                            label: (
                                <Typography.Text type="secondary">
                                    没有找到用户... TwT
                                </Typography.Text>
                            ),
                            disabled: true,
                        },
                    ]);
                })
                .finally(() => setLoading(false));
        } else {
            setOptions([]);
        }
    }, [debouncedSearch]);

    const handleSearch = (value) => setInputValue(value);

    const handleSelect = (value, option) => {
        if (option.user && !otherNarrators.some((n) => n.id === option.user.id)) {
            setOtherNarrators([...otherNarrators, option.user]);
        }
        setInputValue('');
        setOptions([]);
    };

    const handleRemove = (id) => {
        setOtherNarrators(otherNarrators.filter((item) => item.id !== id));
    };

    return (
        <>
            <AutoComplete
                style={{ width: 200 }}
                options={loading ? [
                    {
                        value: 'loading',
                        label: (
                            <div style={{ textAlign: 'center' }}>
                                <Spin size="small" />
                            </div>
                        ),
                        disabled: true,
                    },
                ] : options}
                onSearch={handleSearch}
                onSelect={handleSelect}
                value={inputValue}
                allowClear
            >
                <Input
                    prefix={<SearchOutlined />}
                    placeholder="搜索用户"
                />
            </AutoComplete>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 12 }}>
                {otherNarrators.map((narrator) => (
                    <div
                        key={narrator.id}
                        style={{
                            background: '#f0f0f0',
                            borderRadius: 4,
                            padding: '4px 8px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 4,
                        }}
                    >
                        <span>{narrator.defaultName}</span>
                        <span
                            style={{ cursor: 'pointer', color: '#999' }}
                            onClick={() => handleRemove(narrator.id)}
                        >
                            ×
                        </span>
                    </div>
                ))}
            </div>
        </>
    );
}

export default OtherNarrators;
