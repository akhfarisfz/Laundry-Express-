import {useState} from "react";
import useHTTP from "../../libs/hooks/useHTTP.jsx";
import useJWT from "../../libs/hooks/useJWT.jsx";
import useMessage from "../../libs/hooks/useMessage.jsx";
import useChangeListener from "../../libs/hooks/useChangeListener.jsx";
import useValidator from "../../libs/hooks/useValidator.jsx";
import {BASE_URL} from "../../libs/config/settings.js";
import {Button, Form, Modal} from "react-bootstrap";
import PropTypes from "prop-types";

const WidgetKasCreateModal = ({callback}) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const http = useHTTP();
  const jwt = useJWT();
  const message = useMessage();
  const changeListener = useChangeListener();

  const [kas, setKas] = useState({
    keterangan: "",
    pemasukan: 0,
    pengeluaran: 0,
    nomorTransaksi: ""
  })

  const kasValidator = useValidator({
    keterangan: [],
    pemasukan: [],
    pengeluaran: [],
    nomorTransaksi: []
  });

  const onKasCreate = () => {
    kasValidator.reset();
    const url = `${BASE_URL}/kas/`;
    const config = {
      headers: {
        Authorization: jwt.get()
      }
    }

    http.privateHTTP.post(url, kas, config).then((response) => {
      message.success(response)
      handleClose()
      callback()
    }).catch((error) => {
      message.error(error);
      kasValidator.except(error)
    })
  }

  return (
    <>
      <Button onClick={handleShow}>Tambah Kas</Button>

      <Modal show={show} onHide={handleClose} size={"lg"} backdrop={"static"} >
        <Modal.Header closeButton={true}>
          <Modal.Title>Tambah Kas</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className={"mb-3"}>
            <Form.Label>Nomor Transaksi</Form.Label>
            <Form.Control
              name={"nomorTransaksi"}
              value={kas.nomorTransaksi}
              onChange={(e) => changeListener.onChangeText(e, kas, setKas)}
            />
          </Form.Group>
          <Form.Group className={"mb-3"}>
            <Form.Label>Keterangan</Form.Label>
            <Form.Control
              name={"keterangan"}
              value={kas.keterangan}
              onChange={(e) => changeListener.onChangeText(e, kas, setKas)}
            />
          </Form.Group>
          <Form.Group className={"mb-3"}>
            <Form.Label>Pemasukan</Form.Label>
            <Form.Control
              type={"number"}
              name={"pemasukan"}
              value={kas.pemasukan}
              onChange={(e) => changeListener.onChangeNumber(e, kas, setKas)}
            />
          </Form.Group>
          <Form.Group className={"mb-3"}>
            <Form.Label>Pengeluaran</Form.Label>
            <Form.Control
              type={"number"}
              name={"pengeluaran"}
              value={kas.pengeluaran}
              onChange={(e) => changeListener.onChangeNumber(e, kas, setKas)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onKasCreate}>Simpan</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

WidgetKasCreateModal.propTypes = {
  callback: PropTypes.func
}

export default WidgetKasCreateModal;