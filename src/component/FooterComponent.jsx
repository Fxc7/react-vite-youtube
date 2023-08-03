import { Container } from 'react-bootstrap';

const FooterComponent = () => {
    return (
        <>
            <footer>
                <Container className="footer-text">
                    <p className="animate__animated animate__fadeIn">&copy; 2023 Farhannnn, Inc - All Right Reserved</p>
                </Container>
            </footer>
        </>
    );
};

export default FooterComponent;