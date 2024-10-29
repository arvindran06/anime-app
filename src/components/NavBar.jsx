import { Navbar, Nav } from 'react-bootstrap';
import logo from '../assets/logo.png';
import '../components/styling/navbar.css';

const MyNavbar = () => {
    return (
        <Navbar bg="dark" variant="dark" expand="lg" sticky="top" style={{ width: '100%' }}>
            <Navbar.Brand href="/home">
                <img
                    src={logo}
                    alt="Logo"
                    style={{ width: '70px', height: '70px' }}
                    className="d-inline-block align-top"
                />
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="/popular-animes">Popular Animes</Nav.Link>
                    <Nav.Link href="/anime-movies">Anime Movies</Nav.Link>
                    <Nav.Link href="/genres">Genres</Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link href="/search" className="ml-2">
                        <i className="bi bi-search" style={{ fontSize: '24px' }}></i>
                    </Nav.Link>
                    <Nav.Link href="/watchlist" className="ml-2">
                        <i className="bi bi-bookmark" style={{ fontSize: '24px' }}></i>
                    </Nav.Link>
                    <Nav.Link href="/profile" className="ml-2">
                        <i className="bi bi-person-circle" style={{ fontSize: '24px' }}></i>
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default MyNavbar;
