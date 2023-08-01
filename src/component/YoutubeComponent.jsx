import React, { useState, useEffect } from 'react';
import { Card, ListGroup, Modal, Button, Placeholder, Spinner, ProgressBar, Collapse, Container } from 'react-bootstrap';
import { BiUserCircle, BiGlobe, BiCategory } from 'react-icons/bi';
import { BsEyeFill, BsSpeedometer2 } from 'react-icons/bs';
import { GiDuration } from 'react-icons/gi';

import config from '../../config.js';

const YoutubeComponent = ({ url }) => {
    const [show, setShow] = useState(false);
    const [showAudio, setShowAudio] = useState(false);
    const [showVideo, setShowVideo] = useState(false);
    const [download, setDownload] = useState(false);
    const [loading, setLoading] = useState(false);
    const [titleDownload, setTitleDownload] = useState(null);
    const [extension, setExtension] = useState(null);
    const [urlDownload, setUrlDownload] = useState(null);
    const [speedDownload, setSpeedDownload] = useState(null);
    const [sizeMedia, setSizeMedia] = useState(null);
    const [progressDownload, setProgressDownload] = useState(null);
    const [progressSizeDownload, setProgressSizeDownload] = useState(null);
    const [videoData, setVideoData] = useState(null);
    const [error, setError] = useState(null);

    const configs = config.configs;
    const formatSize = config.formatSize;
    const calculateDownloadSpeed = config.calculateDownloadSpeed;

    const handleSetAll = () => {
        setSpeedDownload(0);
        setSizeMedia(null);
        setUrlDownload(null);
        setProgressDownload(null);
        setProgressSizeDownload(null);
        setDownload(false);
    };
    const handleDownloading = () => setDownload(true);
    const handleDescription = () => setShow(!show);
    const handleMediaClose = (type) => type === 'audio' ? setShowAudio(false) : setShowVideo(false);
    const handleMediaShow = (type) => type === 'audio' ? setShowAudio(true) : setShowVideo(true);


    const downloadMedia = async (link) => {
        try {
            const startTime = Date.now();
            const response = await fetch(`${configs.url}${link}`, {
                method: 'GET'
            });

            if (!response.ok) {
                setError('Failed to fetch the media.');
                handleSetAll();
                return;
            }

            const contentDisposition = response.headers.get('content-disposition');
            const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
            const matches = filenameRegex.exec(contentDisposition);
            const filename = matches !== null && matches[1] ? matches[1].replace(/['"]/g, '') : `${titleDownload}.${extension}`;

            const totalSize = response.headers.get('content-length');
            setSizeMedia(formatSize(totalSize));
            const reader = response.body.getReader();
            let receivedSize = 0;
            let chunks = [];

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                chunks.push(value);
                receivedSize += value.length;
                setProgressSizeDownload(formatSize(receivedSize));
                setSpeedDownload(calculateDownloadSpeed(startTime, receivedSize) / 1024)
                const progress = (receivedSize / totalSize) * 100;
                setProgressDownload(progress.toFixed());
            }

            const blob = new Blob(chunks);
            const url = URL.createObjectURL(blob);

            const linkElement = document.createElement('a');
            linkElement.href = url;
            linkElement.download = filename;
            linkElement.click();
            linkElement.addEventListener('click', () => {
                URL.revokeObjectURL(url);
                linkElement.remove();
            });
            handleSetAll();
        } catch (error) {
            console.error('Error downloading media:', error);
            handleSetAll();
            setError('Error downloading media...');
        }
    };


    useEffect(() => {
        if (download) {
            downloadMedia(urlDownload);
        }
    }, [download]);

    useEffect(() => {
        if (showAudio) {
            handleSetAll();
            setExtension('mp3');
            setUrlDownload(videoData.audio_url);
        } else if (showVideo) {
            handleSetAll();
            setExtension('mp4');
            setUrlDownload(videoData.video_url);
        }
    }, [videoData]);

    useEffect(() => {
        const fetchVideoData = async () => {
            if (url) {
                setLoading(true);
                setError(null);
                try {
                    const videoDataResponse = await fetch(`${configs.url}youtube/${url}`).then(response => response.json());
                    
                    if (typeof videoDataResponse === 'object' && videoDataResponse) {
                        setLoading(false);
                        swal('Success', 'Successfully fetched video data', 'success');
                        setTitleDownload('xcoders_-_' + videoDataResponse.title.replaceAll(' ', '_'));
                        setVideoData(videoDataResponse);
                    } else {
                        setError('Error getting video data.');
                    }
                } catch (error) {
                    setLoading(false);
                    setError('Error fetching video data.');
                    console.error('Error fetching video data:', error);
                }
            }
        };
        fetchVideoData();
    }, [url]);

    if (error) {
        swal('Error', error, 'error');
        handleSetAll();
        setError(null);
    }

    if (loading) {
        return (
            <div className="loading animate__animated animate__fadeIn">
                <Card className="text-center box-3d">
                    <Card.Img variant="top" src="https://placehold.co/943x504/black/white?font=montserrat&text=Loading..." />
                    <Card.Body>
                        <Placeholder as={Card.Title} animation="glow">
                            <Placeholder xs={10} />
                        </Placeholder>
                        <Placeholder as={Card.Text} animation="glow">
                            <Placeholder xs={6} />
                            <br />
                            <Placeholder xs={7} />
                            <br />
                            <Placeholder xs={5} />
                            <br />
                            <Placeholder xs={4} />
                            <br />
                            <Placeholder xs={6} />
                        </Placeholder>
                        <Placeholder.Button variant="primary" xs={8} />
                        <Placeholder.Button variant="primary" xs={8} />
                    </Card.Body>
                </Card>
            </div>
        );
    }
    if (videoData) {
        return (
            <>
                <Modal show={showAudio ? showAudio : showVideo} onHide={() => handleMediaClose(showAudio ? 'audio' : 'video')} backdrop="static" keyboard={false} centered>
                    <Modal.Header>
                        <Modal.Title>Downloaded {showAudio ? 'Audio' : 'Video'}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ maxHeight: '400px', overflowY: 'auto' }}>
                        {
                            download ? (
                                <>
                                    <p style={{ fontSize: 'small' }}>Download speed on your network.</p>
                                    <p style={{ fontSize: 'small' }}>
                                        <BsSpeedometer2 size={17} /> {`${sizeMedia || 0}/${progressSizeDownload || 0}`} {
                                            speedDownload ? `${speedDownload.toFixed(2)} KB/s` : ''
                                        }
                                    </p>
                                    <ProgressBar animated now={progressDownload || 0} label={`${progressDownload || 0}%`} />
                                </>
                            ) : <p style={{ fontSize: 'small' }}>Do you want to download this media? if so, press the download button to download the media and if you don't want to download the media, just press the cancel button.</p>
                        }
                    </Modal.Body>
                    <Modal.Footer>
                        {
                            !download ? <Button variant="danger" onClick={() => {
                                handleMediaClose(showAudio ? 'audio' : 'video');
                                handleSetAll();
                            }}>
                                Cancel
                            </Button> : ''
                        }
                        <Button variant="success" onClick={handleDownloading}>
                            {
                                download ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : ''
                            }{' '}Download
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Card className="align-items-center box-3d animate__animated animate__fadeIn animate__delay-1s">
                    <Card.Img variant="top" src={videoData.thumbnail} alt="Video Thumbnail" />
                    <Card.Body className="text-center">
                        <ListGroup className="list-group-flush justify-content-between" style={{ borderRadius: '5px' }}>
                            {

                                videoData?.title ? <ListGroup.Item variant="primary"><span className="text-sm">{videoData.title}</span></ListGroup.Item> : ''
                            }
                            {
                                videoData?.channel_name ? <ListGroup.Item variant="primary"><Card.Link className="channel" href={videoData.channel_url} target="_blank"><BiUserCircle size={19} /> {videoData.channel_name}</Card.Link></ListGroup.Item> : ''
                            }
                            {
                                <ListGroup.Item variant="primary"><GiDuration /> <span className="duration">{videoData.duration}</span></ListGroup.Item>
                            }
                            {
                                videoData?.published_at ? <ListGroup.Item variant="primary"><BiGlobe /> <span className="published">{videoData.published_at}</span></ListGroup.Item> : ''
                            }
                            {
                                videoData?.category ? <ListGroup.Item variant="primary"><BiCategory /> <span className="category">{videoData.category}</span></ListGroup.Item> : ''
                            }
                            {
                                videoData?.views_count ? <ListGroup.Item variant="primary"><BsEyeFill /> <span className="views">{videoData.views_count}</span></ListGroup.Item> : ''
                            }
                            {
                                videoData?.description ? <ListGroup.Item action variant="primary" onClick={handleDescription} aria-controls="collapse-description" aria-expanded={show}>
                                    <Card.Text>Click {!show ? 'Show' : 'Hide'} Description</Card.Text>
                                </ListGroup.Item> : ''
                            }
                            {
                                show ? <ListGroup.Item className="animate__animated animate__fadeIn" variant={show ? 'primary' : ''}>
                                    <Collapse in={show}>
                                        <div id="collapse-description">
                                            <Card.Text>
                                                {videoData.description}
                                            </Card.Text>
                                        </div>
                                    </Collapse>
                                </ListGroup.Item> : ''
                            }
                        </ListGroup>
                        <div className="download-button">
                            <Button className="px-5" onClick={() => {
                                handleMediaShow('video');
                                setExtension('mp4');
                                setUrlDownload(videoData.video_url);
                            }
                            }>Video</Button>
                            <Button className="px-5" onClick={() => {
                                handleMediaShow('audio');
                                setExtension('mp3');
                                setUrlDownload(videoData.audio_url);
                            }}>Audio</Button>
                        </div>
                    </Card.Body>
                </Card>
            </>
        );
    }
};

export default YoutubeComponent;