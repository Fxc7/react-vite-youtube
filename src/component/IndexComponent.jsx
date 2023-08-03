import React, { useEffect, useState } from 'react';
import { Toaster, toast } from 'sonner';
import { Container } from 'react-bootstrap';

import NavbarComponent from './NavbarComponent.jsx';
import FooterComponent from './FooterComponent.jsx';

import OneRowComponent from './rows/OneRowComponent.jsx';
import TwoRowComponent from './rows/TwoRowComponent.jsx';
import ThreeRowComponent from './rows/ThreeRowComponent.jsx';
import FourRowComponent from './rows/FourRowComponent.jsx';

const IndexComponent = () => {
    const [url, setUrl] = useState('');

    const handleInputChange = (value) => {
        if (!value) {
            setUrl('');
            return toast('info!!!', {
                description: 'Input Missing URL.'
            });
        } else if (!/https?\:\/\/(.+)?(youtube\.com\/watch\?v=|youtu\.be\/)[a-zA-Z0-9\-_]+/i.test(value)) {
            setUrl('');
            return toast('info!!!', {
                description: 'Invalid URL, please enter a YouTube URL'
            });
        } else {
            document.querySelector('input[name=url]').value = '';
            return setUrl(value);
        }
    };

    const handleDownload = (value) => {
        setUrl(value);
    };

    useEffect(() => {
        if (url) {
            handleDownload(url);
        }
    }, [url]);

    return (
        <>
            <Toaster expand={false} position="top-center" richColors />
            <NavbarComponent />
            <main>
                <div className="content">
                    <Container>
                        <OneRowComponent handleInputChange={handleInputChange} />
                        <TwoRowComponent url={url} />
                        <ThreeRowComponent />
                        <FourRowComponent />
                    </Container>
                </div>
            </main>
            <FooterComponent />
        </>
    );
};

export default IndexComponent;