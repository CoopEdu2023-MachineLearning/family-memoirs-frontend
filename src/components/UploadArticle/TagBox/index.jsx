import { Tag } from 'antd';

function TagBox() {

    return (
        <>
            <Tag>Tag 1</Tag>
            <Tag>
                <a
                    href="https://github.com/ant-design/ant-design/issues/1862"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Link
                </a>
            </Tag>
            <Tag closeIcon>
                Prevent Default
            </Tag>
            <Tag onClose={console.log}>
                Tag 2
            </Tag>
            <Tag
                closable={{
                    'aria-label': 'Close Button'
                }}
                onClose={console.log}
            >
                Tag 3
            </Tag>
        </>
    )

}

export default TagBox;