import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import useHTTP from "../../libs/hooks/useHTTP.jsx";
import useJWT from "../../libs/hooks/useJWT.jsx";
import useMessage from "../../libs/hooks/useMessage.jsx";
import {useState} from "react";
import useValidator from "../../libs/hooks/useValidator.jsx";
import useChangeListener from "../../libs/hooks/useChangeListener.jsx";
import {BASE_URL} from "../../libs/config/settings.js";
import ComponentMessageValidation from "../../libs/components/ComponentMessageValidation.jsx";

const PageBarangCreate = () => {
  const navigate = useNavigate();
  const http = useHTTP();
  const jwt = useJWT();
  const message = useMessage();

  const [barang, setBarang] = useState({nama: ""})
  const barangChangeListener = useChangeListener();
  const barangValidator = useValidator({nama: []})

  const onBarangCreate = () => {
    barangValidator.reset();

    const config = {
      headers: {
        Authorization: jwt.get()
      }
    }

    http.privateHTTP.post(`${BASE_URL}/barang/`, barang, config).then((response) => {
      message.success(response);
      navigate("/")
    }).catch((error) => {
      message.error(error)
      barangValidator.except(error)
    })
  }

  return (
    <>
      <Container className={"mt-4"}>
        <Row className={"d-flex justify-content-center mb-3"}>
          <Col md={6}>
            <h4>Buat barang</h4>
          </Col>
        </Row>
        <Row className={"d-flex justify-content-center mb-3"}>
          <Col md={6}>
            <Card>
              <Card.Body>
                <Card.Subtitle className={"mb-3"}>Nama Barang</Card.Subtitle>
                <Form.Group className={"mb-3"}>
                  <Form.Control
                    placeholder={"Nama jasa/barang cucian"}
                    className={"bg-body-tertiary"}
                    value={barang.nama}
                    name={"nama"}
                    onChange={(e) => barangChangeListener.onChangeText(e, barang, setBarang)}
                  />
                  <Form.Text>Harap di isi dengan nama jasa/layanan laundry.</Form.Text>
                  <ComponentMessageValidation messages={barangValidator.get('nama')} />
                </Form.Group>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className={"d-flex justify-content-center"}>
          <Col md={6} className={"d-flex justify-content-end gap-2"}>
            <Button variant={"outline-secondary"} onClick={() => navigate("/")}>Batal</Button>
            <Button onClick={onBarangCreate}>Simpan</Button>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default PageBarangCreate;