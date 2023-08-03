import { Row } from 'react-bootstrap';

const ThreeRowComponent = () => {
    return (
        <>
            <Row className="animate__animated animate__fadeIn">
                <p className="text-center">
                    As the third most popular website worldwide, YouTube offers an outstanding user experience. However, it doesn't include a native video download feature. But fret not, because this sites is here to save the day!
                </p>
                <p className="text-center">
                    You can easily convert any YouTube video to MP3 using our advanced online YouTube converter. You can listen to the converted MP3 file before downloading it. This online converter tool is designed and optimized to be used in any mobile, tablet and computer. This is a free service that anyone can use anywhere.
                </p>
                <h1 className="py-3 text-center fw-bold">
                    How to Download Youtube videos?
                </h1>
                <li className="description-download">
                    Open Youtube and copy the video URL you want to download.
                </li>
                <li className="description-download">
                    Paste the video URL in the Search box, Tool will fetch video info.
                </li>
                <li className="description-download">
                    When finished, click the button between audio and video according to your wishes.
                </li>
                <li className="description-download">
                    After you press the button one of the audio and video modal will appear.
                </li>
                <li className="description-download">
                    Now in that modal you press the "Download" button to download.
                </li>
                <li className="description-download">
                    If you have pressed, you wait a few moments.
                </li>
                <li className="description-download">
                    Download speed depends on your signal speed.
                </li>
                <li className="description-download">
                    After the progress is complete, it will automatically download.
                </li>
                <li className="description-download">
                    And it's finished, just open your download folder to see the results.
                </li>
            </Row>
        </>
    );
};

export default ThreeRowComponent;