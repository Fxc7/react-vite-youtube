import { Row } from 'react-bootstrap';

import YoutubeComponent from '../YoutubeComponent.jsx';

const TwoRowComponent = ({ url }) => {
    return (
        <>
            <Row className="py-3">
                <YoutubeComponent url={url} />
            </Row>
        </>
    );
};

export default TwoRowComponent;