import { useState } from "react";
import { ImYoutube, ImYoutube2 } from "react-icons/im";
import { Navbar, Container } from 'react-bootstrap';

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
      return setUrl(value);
    }
  };

  const handleDownload = () => {
    const inputField = document.querySelector('input[type=url]');
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
        <Container className="align-items-center text-center">
          <Navbar.Brand>
            <ImYoutube2 size={40} />{' '}Downloader
          </Navbar.Brand>
        </Container>
      </Navbar>
      <main>
        <YoutubeComponent url={url} />
        <Container className="pb-5 pt-5 mt-5 mb-5 box-3d align-items-center">
          <ImYoutube size={150} />
          <input type="url" placeholder="input url" className="btn btn-block btn-outline-dark bg-transparent btn-lg" onKeyPress={handleKeyPress} />
          <button className="btn btn-lg btn-block btn-danger" onClick={handleDownload}>submit</button>
        </Container>
      </main>
      <footer>
        <p>&copy; 2023 Farhannnn, Inc - All Right Reserved</p>
      </footer>
    </div>
  );
}

export default App;