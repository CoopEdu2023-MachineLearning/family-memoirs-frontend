import { Input } from 'antd'

const { TextArea } = Input;

function Context() {
    return (
        <>
            <TextArea rows={4} placeholder="Write your context here..." />
        </>
    )
}

export default Context;