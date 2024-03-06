import {useMemo, useState} from "react";
import {Button, Col, Form, Modal, Row, Table} from "react-bootstrap";
import useHTTP from "../../libs/hooks/useHTTP.jsx";
import useJWT from "../../libs/hooks/useJWT.jsx";
import useMessage from "../../libs/hooks/useMessage.jsx";
import useChangeListener from "../../libs/hooks/useChangeListener.jsx";
import useValidator from "../../libs/hooks/useValidator.jsx";
import WidgetBarangChoice from "../barang/WidgetBarangChoice.jsx";
import {BASE_URL} from "../../libs/config/settings.js";
import {useNavigate} from "react-router-dom";
import PropTypes from "prop-types";

const HARGA_PER_KG = 15000

const WidgetTerimaCreateModal = ({callback}) => {
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const http = useHTTP();
  const jwt = useJWT();
  const message = useMessage();
  const changeListener = useChangeListener();

  const [terima, setTerima] = useState({
    nomor: "",
    berat: 0,
    uangMuka: 0
  })

  const terimaValidator = useValidator({
    nomor: [],
    berat: [],
    uangMuka: []
  })

  const [pelanggan, setPelanggan] = useState({
    nama: "",
    alamat: "",
    telepon: ""
  })

  const pelangganValidator = useValidator({
    nama: [],
    alamat: [],
    telepon: []
  })

  const [items, setItems] = useState([])

  const onCallbackBarangChoice = (barang) => {
    const itemExist = items.find((obj) => obj._id === barang._id);

    if (itemExist) {
      return;
    }

    setItems([...items, barang])
  }

  const onTerimaCreate = () => {
    const url = `${BASE_URL}/terima/`;
    const config = {
      headers: {
        Authorization: jwt.get()
      }
    }
    const payload = {
      ...terima,
      pelanggan,
      items
    }

    http.privateHTTP.post(url, payload, config).then((response) => {
      message.success(response)
      message.confirm("Cetak Struk", 'Apakah ingin mencetak struk', () => {
        navigate('/terima/print', {state: response.data})
      })
      callback()
      handleClose()
    }).catch((error) => {
      console.log(error)
      message.error(error)
    })
  }

  const onItemRemove = (barang) => {
    const temps = items.filter((value) => value._id !== barang._id);
    setItems(temps);
  }

  const getTerimaTotal = useMemo(() => parseInt(Number(terima.berat)) * HARGA_PER_KG)

  const getSisa = useMemo(() => {
    if (terima.uangMuka < getTerimaTotal) {
      return getTerimaTotal - terima.uangMuka
    }
    return 0
  })

  const getKembali = useMemo(() => {
    if (terima.uangMuka >= getTerimaTotal) {
      return terima.uangMuka - getTerimaTotal
    }
    return 0
  })

  return (
    <>
      <Button onClick={handleShow}>Transaksi Baru</Button>

      <Modal show={show} onHide={handleClose} size={"xl"} backdrop={"static"} scrollable={true}>
        <Modal.Header closeButton>
          <Modal.Title>Tambah Transaski Cucian</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className={"mb-3"}>
            <Form.Label>Nomor Transaksi Penerimaan</Form.Label>
            <Form.Control
              name={"nomor"}
              value={terima.nomor}
              onChange={(e) => changeListener.onChangeText(e, terima, setTerima)}
              className={"w-50"} />
          </Form.Group>

          <Row>
            <Col md={8}>
              <Form.Group className={"mb-3"}>
                <Form.Label>Nama Pelanggan</Form.Label>
                <Form.Control
                  name={"nama"}
                  value={pelanggan.nama}
                  onChange={(e) => changeListener.onChangeText(e, pelanggan, setPelanggan)}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className={"mb-3"}>
                <Form.Label>Telepon Pelanggan</Form.Label>
                <Form.Control
                  name={"telepon"}
                  value={pelanggan.telepon}
                  onChange={(e) => changeListener.onChangeText(e, pelanggan, setPelanggan)}
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className={"mb-3"}>
            <Form.Label>Alamat</Form.Label>
            <Form.Control
              as={"textarea"}
              name={"alamat"}
              value={pelanggan.alamat}
              onChange={(e) => changeListener.onChangeText(e, pelanggan, setPelanggan)}
            />
          </Form.Group>
          <Row>
            <Col>
              <WidgetBarangChoice callback={onCallbackBarangChoice} />
            </Col>
            <Col md={8}>
              <Table striped={true} bordered={true} responsive={true}>
                <thead>
                <tr>
                  <th>Nama Barang</th>
                  <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {items.map((value, index) => (
                  <tr key={index}>
                    <td>{value.nama}</td>
                    <td>
                      <Button size={"sm"} onClick={() => onItemRemove(value)}>Hapus</Button>
                    </td>
                  </tr>
                ))}
                </tbody>
                <tbody>
                <tr>
                  <th>Berat</th>
                  <td>
                    <Form.Control
                      placeholder={"dalam Kg"}
                      value={terima.berat}
                      type={"number"}
                      name={"berat"}
                      onChange={(e) => changeListener.onChangeNumber(e, terima, setTerima)}
                    />
                  </td>
                </tr>
                <tr>
                  <th>Total</th>
                  <td>
                    <Form.Control
                      readOnly={true}
                      value={getTerimaTotal}
                    />
                  </td>
                </tr>
                <tr>
                  <th>Uang Muka</th>
                  <td>
                    <Form.Control
                      value={terima.uangMuka}
                      type={"number"}
                      name={"uangMuka"}
                      onChange={(e) => changeListener.onChangeNumber(e, terima, setTerima)}
                    />
                  </td>
                </tr>
                <tr>
                  <th>Sisa</th>
                  <td>
                    <h5>{getSisa}</h5>
                  </td>
                </tr>
                <tr>
                  <th>Kembali</th>
                  <td>
                    <h5>{getKembali}</h5>
                  </td>
                </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={onTerimaCreate}>Simpan</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

WidgetTerimaCreateModal.propTypes = {
  callback: PropTypes.func
}

export default WidgetTerimaCreateModal;