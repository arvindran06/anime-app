import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import logo from '../assets/logo.png';
import '../components/styling/navbar.css'



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
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
                <Nav className="me-auto">
                    <NavDropdown title={<i className="bi bi-list" style={{ fontSize: '24px' }}></i>} id="basic-nav-dropdown" align="start">
                        <NavDropdown.Item href="/popular-animes">Popular Animes</NavDropdown.Item>
                        <NavDropdown.Item href="/anime-movies">Anime Movies</NavDropdown.Item>
                        <NavDropdown.Item href="/genres">Genres</NavDropdown.Item>
                    </NavDropdown>
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
