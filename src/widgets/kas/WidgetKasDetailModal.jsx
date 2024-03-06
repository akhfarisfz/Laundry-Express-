import {useState} from "react";
import useHTTP from "../../libs/hooks/useHTTP.jsx";
import useJWT from "../../libs/hooks/useJWT.jsx";
import useMessage from "../../libs/hooks/useMessage.jsx";
import useChangeListener from "../../libs/hooks/useChangeListener.jsx";
import useValidator from "../../libs/hooks/useValidator.jsx";
import {BASE_URL} from "../../libs/config/settings.js";
import {Button, Form, Modal} from "react-bootstrap";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import WidgetKasCreateModal from "./WidgetKasCreateModal.jsx";
import ComponentMessageValidation from "../../libs/components/ComponentMessageValidation.jsx";

const WidgetKasDetailModal = ({id, nomorTransaksi, callback}) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const http = useHTTP();
  const jwt = useJWT();
  const message = useMessage();
  const changeListener = useChangeListener();

  const [kas, setKas] = useState({
    _id: "",
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

  const onKasDetail = () => {
    const url = `${BASE_URL}/kas/${id}/`;
    const config = {
      headers: {
        Authorization: jwt.get()
      }
    }

    http.privateHTTP.get(url, config).then((response) => {
      setKas(response.data)
    }).catch((error) => {
      message.error(error);
    })
  }

  const onKasUpdate = () => {
    kasValidator.reset();
    const url = `${BASE_URL}/kas/${id}/`;
    const config = {
      headers: {
        Authorization: jwt.get()
      }
    }

    http.privateHTTP.put(url, kas, config).then((response) => {
      message.success(response)
      handleClose()
      callback()
    }).catch((error) => {
      message.error(error);
      kasValidator.except(error)
    })
  }

  const onKasDelete = () => {
    message.confirmRemove(() => {
      const url = `${BASE_URL}/kas/${id}/`;
      const config = {
        headers: {
          Authorization: jwt.get()
        }
      }

      http.privateHTTP.delete(url, config).then((response) => {
        message.success(response)
        handleClose()
        callback()
      }).catch((error) => {
        message.error(error);
      })
    })
  }

  const onShow = () => {
    onKasDetail();
  }

  return (
    <>
      <Link onClick={handleShow} className={"text-decoration-none"}>{nomorTransaksi}</Link>

      <Modal show={show} onHide={handleClose} onShow={onShow} size={"lg"} backdrop={"static"} >
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
            <ComponentMessageValidation messages={kasValidator.get("nomorTransaksi")} />
          </Form.Group>
          <Form.Group className={"mb-3"}>
            <Form.Label>Keterangan</Form.Label>
            <Form.Control
              name={"keterangan"}
              value={kas.keterangan}
              onChange={(e) => changeListener.onChangeText(e, kas, setKas)}
            />
            <ComponentMessageValidation messages={kasValidator.get("keterangan")} />
          </Form.Group>
          <Form.Group className={"mb-3"}>
            <Form.Label>Pemasukan</Form.Label>
            <Form.Control
              type={"number"}
              name={"pemasukan"}
              value={kas.pemasukan}
              onChange={(e) => changeListener.onChangeNumber(e, kas, setKas)}
            />
            <ComponentMessageValidation messages={kasValidator.get("pemasukan")} />
          </Form.Group>
          <Form.Group className={"mb-3"}>
            <Form.Label>Pengeluaran</Form.Label>
            <Form.Control
              type={"number"}
              name={"pengeluaran"}
              value={kas.pengeluaran}
              onChange={(e) => changeListener.onChangeNumber(e, kas, setKas)}
            />
            <ComponentMessageValidation messages={kasValidator.get("pengeluaran")} />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onKasDelete} variant={"outline-secondary"}>Delete</Button>
          <Button onClick={onKasUpdate}>Simpan</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

WidgetKasDetailModal.propTypes = {
  callback: PropTypes.func,
  id: PropTypes.string,
  nomorTransaksi: PropTypes.string
}

export default WidgetKasDetailModal;