import { Navbar, Nav, Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import Carousel from 'react-bootstrap/Carousel';
import { useContext, useState } from "react";
import { Link } from 'react-scroll';
import useChangeListener from "../../libs/hooks/useChangeListener.jsx";
import useHTTP from "../../libs/hooks/useHTTP.jsx";
import { BASE_URL } from "../../libs/config/settings.js";
import useJWT from "../../libs/hooks/useJWT.jsx";
import { ContextApplication } from "../../libs/config/contexts.js";
import useValidator from "../../libs/hooks/useValidator.jsx";
import ComponentMessageValidation from "../../libs/components/ComponentMessageValidation.jsx";
import { FaFacebook, FaInstagram, FaGithub, FaArrowRight } from 'react-icons/fa';
import "../style/PageAuthStyle.css"

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
      {/* <div className="Container"> */}
      <Navbar expand="lg" style={{ backgroundColor: '#F5F7F8' }}>
        <Container className="container">
          <Navbar.Brand href="#home">Laundry Express</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link to="home" smooth={true} duration={150}> <Nav.Link>Home</Nav.Link></Link>
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
      <Row className={"MenuHome"} id="home">
        <Carousel data-bs-theme="dark">
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="src/assets/Green Playful Laundry Express Landscape Banner.png"
              alt="First slide"
            />
            <Carousel.Caption>
              <p>Ingin tahu lebih banyak tentang kami ?</p>
              <a className="link" href="#" style={{ color: 'black' }}>
                <Link to="service" smooth={true} duration={150}>
                  Learn More
                </Link>
              </a>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="src/assets/2.png"
              alt="Second slide"
            />
            <Carousel.Caption>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="src/assets/3.png"
              alt="Third slide"
            />
            <Carousel.Caption>
              <a className="link" href="#">
                <Link to="MenuAbout" smooth={true} duration={150}>
                  <h5 style={{ color: 'black' }}>Contact Us</h5>
                </Link>
              </a>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </Row>


      <Row className={"MenuService"} id="service">
        <Col md={10}>
          <h2>Our Service</h2>
          <div className="row">
            <div className="col-md-4">
              <Card style={{ backgroundColor: '#495E57', color: 'white', boxShadow: '10px 10px 20px rgba(0, 0, 0, 0.2)', padding: '2rem' }}>
                <Card.Img variant="top" src="src/assets/washing-machine.png" className="imageService"/>
                <Card.Body>
                  <Card.Title>Wash Only</Card.Title>
                  <Card.Text>
                    Layanan mencuci pakaian tanpa layanan penyetrikaan, cocok untuk pakaian yang hanya perlu dicuci. Pakaian tetap dilipat dan lebih cepat
                  </Card.Text>
                  <a className="link" href="http://">
                    <Link to="https://www.google.com/" smooth={true} duration={150}>
                      Read More <FaArrowRight />
                    </Link>
                  </a>
                </Card.Body>
              </Card>
            </div>
            <div className="col-md-4">
              <Card style={{ backgroundColor: '#495E57', color: 'white', boxShadow: '10px 10px 20px rgba(0, 0, 0, 0.2)', padding: '2rem' }}>
                <Card.Img variant="top" src="src/assets/iron.png" className="imageService"/>
                <Card.Body>
                  <Card.Title>Iron Only</Card.Title>
                  <Card.Text>
                    Layanan menyetrika pakaian tanpa layanan pencucian, cocok untuk pakaian yang sudah dicuci dan hanya memerlukan penyetrikaan.
                  </Card.Text>
                  <a className="link" href="http://">
                    <Link to="https://www.google.com/" smooth={true} duration={150}>
                      Read More <FaArrowRight />
                    </Link>
                  </a>
                </Card.Body>
              </Card>
            </div>
            <div className="col-md-4">
              <Card style={{ backgroundColor: '#495E57', color: 'white', boxShadow: '10px 10px 20px rgba(0, 0, 0, 0.2)', padding: '2rem' }}>
                <Card.Img variant="top" src="src/assets/laundry.png" className="imageService" />
                <Card.Body>
                  <Card.Title>Wash and Iron</Card.Title>
                  <Card.Text>
                    Layanan mencuci dan menyetrika pakaian untuk hasil bersih dan rapi dalam satu paket. Cocok untuk anda yang membutuhkan layanan lengkap
                  </Card.Text>
                  <a className="link" href="http://">
                    <Link to="https://www.google.com/" smooth={true} duration={150}>
                      Read More <FaArrowRight />
                    </Link>
                  </a>
                </Card.Body>
              </Card>
            </div>
          </div>
        </Col>
      </Row>

      <Row className={"MenuAbout"} id="about">
        <Col md={10} >
          <h2 className="judulAboutUs">About Us</h2>
          <div className="row">
            <div className="col-md-3">
              <h4>Laundry Express</h4>
              <img src="src/assets/washing-machine.png" alt="" width="30%" />
              <p>
              <span>Need laundry, call Laundry Express</span>
              </p>
            </div>
            <div className="col-md-3">
              <h4>Product Price </h4>
              <p>Wash Only</p>
              <p>Iron Only</p>
              <p>Wash & Iron</p>
            </div>
            <div className="col-md-3">
              <h4>Company</h4>
              <p>Privacy & Detail</p>
              <p>Term & Condition</p>
              <p>Feedback</p>
            </div>
            <div className="col-md-3">
              <h4>Get In Touch</h4>
              <p>You can contact us on</p>
              <div className="social-links">
                <a className="link" href="https://www.facebook.com/">
                  <Link to="">
                    <FaFacebook />
                  </Link>
                </a>
                <a className="link" href="https://www.instagram.com/">
                  <Link to="#">
                    <FaInstagram />
                  </Link>
                </a>
                <a className="link" href="https://github.com/">
                  <Link to="#" target="_blank">
                    <FaGithub />
                  </Link>
                </a>
              </div>
            </div>
          </div>
          <p className="footer">© 2023. Portofolio. All Rights Reserved.</p>
        </Col>
      </Row>

    </>
  )
}

export default PageAuthSignIn;