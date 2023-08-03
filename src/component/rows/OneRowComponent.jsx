import React from 'react';
import { Row } from 'react-bootstrap';
import { ImYoutube } from 'react-icons/im';

const OneRowComponent = ({ handleInputChange }) => {
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            const inputField = event.target;
            const value = inputField.value.trim();
            handleInputChange(value);
        }
    };

    const handleButtonClick = () => {
        const inputField = document.querySelector('input[name=url]');
        const value = inputField.value.trim();
        handleInputChange(value);
    };

    return (
        <>
            <Row className="box-3d text-center">
                <ImYoutube size={180} className="animate__animated animate__fadeIn" />
                <input style={{ color: 'white', fontSize: '14px', cursor: 'text' }} name="url" type="url" placeholder="input url" className="btn btn-outline-dark btn-lg animate__animated animate__fadeIn" onKeyPress={handleKeyPress} />
                <button id="downloadButton" className="btn btn-lg elegant animate__animated animate__fadeIn" onClick={handleButtonClick}>submit</button>
                <p className="text-content-download animate__animated animate__fadeIn">Download YouTube videos and audio from source!</p>
            </Row>
        </>
    );
};

export default OneRowComponent;
