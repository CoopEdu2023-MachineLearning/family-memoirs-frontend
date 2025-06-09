import { Typography } from "antd";

const { Text } = Typography;

export const HighlightText = ({
    text,
    highlightWrapper = (text, key) => <Text className="title-body-color" key={key}>{text}</Text>,
    normalWrapper = (text, key) => <Text className="tag-timeline-color" key={key}>{text}</Text>
}) => {
    const parts = text.split(/(<mark>.*?<\/mark>)/g);
    return (
        <>
            {parts.map((part, index) => {
                if (part.startsWith('<mark>') && part.endsWith('</mark>')) {
                    const content = part.slice(6, -7); // Remove <mark> and </mark>
                    return highlightWrapper(content, index);
                }
                return normalWrapper(part, index);
            })}
        </>
    );
};
