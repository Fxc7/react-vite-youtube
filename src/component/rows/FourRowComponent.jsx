import { Row, Col } from 'react-bootstrap';

import config from '../../../config.js';

const FourRowComponent = () => {
    return (
        <>
            <Row className="py-5 animate__animated animate__fadeIn" sm={3}>
                {
                    config.rows.map((element) => (
                        <Col key={element.id} className="mb-4 py-2 mx-4 shadow rounded-5" data-aos={element.data_aos}>
                            <element.icon size={element.size} />
                            <h4>
                                <strong>{element.title}</strong>
                            </h4>
                            <p>{element.description}</p>
                        </Col>
                    ))
                }
            </Row>
        </>
    );
};

export default FourRowComponent;