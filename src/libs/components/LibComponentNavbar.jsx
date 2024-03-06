import { Container, Nav, Navbar } from "react-bootstrap";
import { useContext } from "react";
import { ContextApplication } from "../config/contexts.js";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTshirt, faCheck, faMoneyBillWave, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
library.add(faTshirt, faCheck, faMoneyBillWave, faSignOutAlt);
import useJWT from "../hooks/useJWT.jsx";
import useHTTP from "../hooks/useHTTP.jsx";

const LibComponentNavbar = () => {
  const jwt = useJWT()

  const applcation = useContext(ContextApplication);

  const signOut = () => {
    alert
    jwt.signOut();
    applcation.setIsAuthenticated(false);
  }

  return (
    <Navbar expand="lg" className="d-print-none" style={{backgroundColor: '#E8C872' }}>
      <Container>
        <Navbar.Brand href="#">
        <img
              src="src/assets/washing-machine.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
        Laundry Management System</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        {applcation.isAuthenticated && (
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <Nav.Link href="#/"><FontAwesomeIcon icon="tshirt" /> Barang</Nav.Link>
              <Nav.Link href="#terima"><FontAwesomeIcon icon="check" /> Terima</Nav.Link>
              <Nav.Link href="#kas"><FontAwesomeIcon icon="money-bill-wave" /> Kas</Nav.Link>
            </Nav>
            <Nav>
            <Nav.Link onClick={signOut}><FontAwesomeIcon icon="sign-out-alt" /> Log Out</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        )}
      </Container>
    </Navbar>
  )
}

export default LibComponentNavbar;