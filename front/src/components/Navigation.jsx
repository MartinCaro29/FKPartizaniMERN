import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Logo from "../img/logopartizoni.png";
import { FaFacebook, FaInstagram, FaTiktok } from 'react-icons/fa';
import '../index.css';

function Navigation() {
  return (
    <Navbar sticky="top" expand="lg" className="bg-body-tertiary" style={{ fontFamily: 'Cinzel', paddingTop: 0, paddingBottom: 0, userSelect: 'none' }}>
      <Container fluid style={{ height: '5rem', background: 'linear-gradient(90deg, rgba(254,0,0,1) 0%, rgba(208,0,0,1) 100%)', color: 'white' }}>
        <Navbar.Brand className="brand-name" href="/" style={{ color: 'white', fontSize: '2.5rem' }}>
          <img
            src={Logo}
            width="60px"
            height="60px"
            className="d-inline-block align-top"
            alt="Partizani logo"
            style={{ marginRight: '0.6rem' }}
          />
          <span className="navbar-brand-text">Partizani Insider</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto" style={{ gap: '15px' }} >
            <Nav.Link style={{ fontSize: '1.2rem', color: 'white' }} href="/">Kreu</Nav.Link>

            <NavDropdown title="Ekipi" id="basic-nav-dropdown">
              <NavDropdown.Item href="/aboutus">Kush jemi ne</NavDropdown.Item>
              <NavDropdown.Item href="/historia">Historia</NavDropdown.Item>
              <NavDropdown.Item href="/ndeshjet">Ndeshjet</NavDropdown.Item>
              <NavDropdown.Item href="/lojtaretdhestafi">Lojtaret dhe Stafi</NavDropdown.Item>
              
            </NavDropdown>

            <Nav.Link style={{ fontSize: '1.2rem', color: 'white' }} href="/dyqani">Dyqani</Nav.Link>
            <Nav.Link style={{ fontSize: '1.2rem', color: 'white' }} href="/kontakt">Kontakt</Nav.Link>

            <div className="social-container" style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginLeft: '0.7rem', marginRight: '0.7rem' }}>
              <a className="social-icon" target="_blank" href="https://www.facebook.com/partizaniinsider/"><FaFacebook /></a>
              <a className="social-icon" target="_blank" href="https://www.instagram.com/partizaniinsider/"><FaInstagram /></a>
              <a className="social-icon" target="_blank" href="https://www.tiktok.com/@partizaniinsider"><FaTiktok /></a>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
