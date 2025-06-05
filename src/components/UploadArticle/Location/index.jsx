import { Input } from 'antd'

function Location({ Location, setLocation }) {
    return (
        <Input
            placeholder="Enter location..."
            value={Location}
            onChange={(e) => setLocation(e.target.value)}
        />
    )
}


export default Location;