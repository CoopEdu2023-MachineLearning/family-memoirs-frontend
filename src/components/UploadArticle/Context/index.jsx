import { Input } from 'antd'

const { TextArea } = Input;

function Context({ context, setContext }) {
    return (
        <>
            <TextArea
                rows={4}
                value={context}
                onChange={(e) => setContext(e.target.value)}
                placeholder="Enter context..."
            />
        </>
    )
}

export default Context;