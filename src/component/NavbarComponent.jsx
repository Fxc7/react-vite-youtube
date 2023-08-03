import { Navbar, Container } from 'react-bootstrap';
import { ImYoutube2 } from 'react-icons/im';

const NavbarComponent = () => {
    return (
        <>
            <Navbar>
                <Container className="align-items-center text-center animate__animated animate__fadeIn">
                    <Navbar.Brand>
                        <ImYoutube2 size={40} />{' '}Downloader
                    </Navbar.Brand>
                </Container>
            </Navbar>
        </>
    );
};

export default NavbarComponent;