import { useState } from "react";
import { ImYoutube, ImYoutube2 } from "react-icons/im";
import { Navbar, Container, Row } from 'react-bootstrap';

import "./App.css";
import YoutubeComponent from "./component/YoutubeComponent.jsx";

function App() {
  const [url, setUrl] = useState('');

  const handleInputChange = (value) => {
    if (!value) {
      setUrl('');
      return swal('Info!!!', 'Missing URL...', 'info');
    } else if (!/https?\:\/\/(.+)?(youtube\.com\/watch\?v=|youtu\.be\/)[a-zA-Z0-9\-_]+/i.test(value)) {
      setUrl('');
      return swal('Info!!!', 'Invalid URL, please enter a YouTube URL', 'info');
    } else {
      document.querySelector('input[name="url"]').value = '';
      return setUrl(value);
    }
  };

  const handleDownload = () => {
    const inputField = document.querySelector('input[name=url]');
    const value = inputField.value.trim();
    return handleInputChange(value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      const inputField = event.target;
      const value = inputField.value.trim();
      return handleInputChange(value);
    }
  };

  return (
    <div>
      <Navbar className="box-3d">
        <Container className="align-items-center text-center animate__animated animate__fadeIn">
          <Navbar.Brand>
            <ImYoutube2 size={40} />{' '}Downloader
          </Navbar.Brand>
        </Container>
      </Navbar>
      <main>
        <div className="content">
          <Container>
            <Row className="box-3d text-center">
              <ImYoutube size={180} className="animate__animated animate__fadeIn" />
              <input style={{ color: 'black', fontSize: '14px', cursor: 'text' }} name="url" type="url" placeholder="input url" className="btn btn-outline-dark bg-transparent btn-lg animate__animated animate__fadeIn" onKeyPress={handleKeyPress} />
              <button className="btn btn-lg btn-danger animate__animated animate__fadeIn" onClick={handleDownload}>submit</button>
              <p className="text-sm animate__animated animate__fadeIn" style={{display: 'flow'}}>Download YouTube videos and audio from source!</p>
            </Row>
            <Row>
              <YoutubeComponent url={url} />
            </Row>
          </Container>
        </div>
      </main>
      <footer>
        <p className="animate__animated animate__fadeIn">&copy; 2023 Farhannnn, Inc - All Right Reserved</p>
      </footer>
    </div>
  );
}

export default App;