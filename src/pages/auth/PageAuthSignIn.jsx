import { Navbar, Nav, Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { useContext, useState } from "react";
import { Link } from 'react-scroll';
import useChangeListener from "../../libs/hooks/useChangeListener.jsx";
import useHTTP from "../../libs/hooks/useHTTP.jsx";
import { BASE_URL } from "../../libs/config/settings.js";
import useJWT from "../../libs/hooks/useJWT.jsx";
import { ContextApplication } from "../../libs/config/contexts.js";
import useValidator from "../../libs/hooks/useValidator.jsx";
import ComponentMessageValidation from "../../libs/components/ComponentMessageValidation.jsx";
import { FaFacebook, FaInstagram, FaGithub } from 'react-icons/fa';
import "./PageAuthStyle.css"

const PageAuthSignIn = () => {
  const application = useContext(ContextApplication)
  const http = useHTTP();
  const jwt = useJWT();

  const [user, setUser] = useState({ email: "", password: "" })
  const userChangeListener = useChangeListener();
  const userValidator = useValidator({ email: [], password: [] })


  const onSignIn = () => {
    userValidator.reset();

    http.publicHTTP.post(`${BASE_URL}/users/signin/`, user).then((response) => {
      jwt.set(response.data.token);
      application.setIsAuthenticated(true);
    }).catch((error) => {
      userValidator.except(error);
      console.log(error)
    })
  }

  return (
    <>
      <Navbar expand="lg" style={{ backgroundColor: '#F5F7F8' }}>
        <Container>
          <Navbar.Brand href="#home">Laundry Management</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link to="home" smooth={true} duration={150}><Nav.Link>Home</Nav.Link></Link>
              <Link to="service" smooth={true} duration={150}><Nav.Link>Service</Nav.Link></Link>
              <Link to="about" smooth={true} duration={150}><Nav.Link>About Us</Nav.Link></Link>
            </Nav>
            <Form inline>
              <Form.Control
                className="m-2"
                name="email"
                value={user.email}
                onChange={(e) => userChangeListener.onChangeText(e, user, setUser)}
                type="email"
                placeholder="Email"
              />
            </Form>
            <Form inline className="mx-3">
              <Form.Control
                className="m-2"
                name="password"
                value={user.password}
                onChange={(e) => userChangeListener.onChangeText(e, user, setUser)}
                type="password"
                placeholder="Password"
              />
            </Form>
            <Button variant="outline-dark" onClick={onSignIn}>Sign In</Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container>
        <Row className={"MenuHome"} id="home">
          <Col md={6}>
            <Card className="bg-dark text-black">
              <Card.Img
                src="src/assets/laundryBanner.webp"
              />
            </Card>
            <h4>Tingkatkan Produktivitas Anda dengan Menghemat Waktu Laundry Bersama Kami.</h4>
            <span>Ingin tahu lebih banyak tentang kami ?</span>
            <Button>
              <Link to="service" smooth={true} duration={150}>
                <Nav.Link>
                  Learn More
                </Nav.Link>
              </Link>
            </Button>
          </Col>
        </Row>

        <Row className={"MenuService"} id="service">
          <h3>Our Service</h3>
          <Col md={10}>

            <div className="row">
              <div className="col-md-4">
                <Card style={{ backgroundColor: '#495E57', color: 'white' }}>
                  <Card.Img variant="top" src="src/assets/washing-machine.png" width="100" />
                  <Card.Body>
                    <Card.Title>Wash Only</Card.Title>
                    <Card.Text>
                      Layanan mencuci pakaian tanpa layanan penyetrikaan, cocok untuk pakaian yang hanya perlu dicuci.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
              <div className="col-md-4">
                <Card style={{ backgroundColor: '#495E57', color: 'white' }}>

                  <Card.Img variant="top" src="src/assets/iron.png" width="100" />
                  <Card.Body>
                    <Card.Title>Iron Only</Card.Title>
                    <Card.Text>
                      Layanan menyetrika pakaian tanpa layanan pencucian, cocok untuk pakaian yang sudah dicuci dan hanya memerlukan penyetrikaan.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
              <div className="col-md-4">
                <Card style={{ backgroundColor: '#495E57', color: 'white' }}>

                  <Card.Img variant="top" src="src/assets/laundry.png" width="100" />
                  <Card.Body>
                    <Card.Title>Wash and Iron</Card.Title>
                    <Card.Text>
                      Layanan mencuci dan menyetrika pakaian untuk hasil bersih dan rapi dalam satu paket.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
            </div>
          </Col>
        </Row>


        <Row className={"MenuAbout"} id="about">
          <Col md={10} >
            <h2>About Us</h2>
            <div className="row">
              <div className="col-md-4">
                <h3>Product Price </h3>
                <p>Wash Only</p>
                <p>Iron Only</p>
                <p>Wash & Iron</p>
              </div>
              <div className="col-md-4">
                <h3>Company</h3>
                <p>Privacy & Detail</p>
                <p>Term & Condition</p>
                <p>Feedback</p>
              </div>
              <div className="col-md-4">
                <h3>Get In Touch</h3>
                <p>You can contact us on</p>
                <div className="social-links">
                  <Link to="https://www.facebook.com/">
                    <FaFacebook />
                  </Link>
                  <Link to="https://www.instagram.com/">
                    <FaInstagram />
                  </Link>
                  <Link to="https://github.com/" target="_blank">
                    <FaGithub />
                  </Link>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

    </>
  )
}

export default PageAuthSignIn;