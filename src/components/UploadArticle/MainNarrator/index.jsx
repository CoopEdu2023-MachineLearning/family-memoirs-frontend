import { useEffect, useState } from 'react';
import { Select, message } from 'antd';
import http from '../../../http';


function MainNarrator(mainNarrator, setMainNarrator) {

    const [list, setList] = useState([]);

    function errorHandler(error) {
        const response = {
            content: '查找讲述者失败： ' + error.message,
            stack: true
        }
        message.error(response)
        setVisible(false)
    }

    useEffect(() => {
        http.get('/main_narrator')
            .then((data) => setList(data))
            .catch(error => errorHandler(error))
    }, []);

    list.forEach((item) => {
        item.value = item.id.toString();
        item.label = item.name;
    });

    return (
        <Select
            clickToHide={true}
            value={mainNarrator}
            placeholder="选择主要的讲述者"
            style={{ width: 180, margin: '10px 0 10px 0' }}
            optionList={list}
            onSelect={(_value, option) => (setMainNarrator(option.name))}
        >
        </Select>
    );
}

export default MainNarrator;