import {Button, Card, Form, ListGroup, Pagination} from "react-bootstrap";
import useHTTP from "../../libs/hooks/useHTTP.jsx";
import useJWT from "../../libs/hooks/useJWT.jsx";
import useMessage from "../../libs/hooks/useMessage.jsx";
import {useEffect, useRef, useState} from "react";
import {BASE_URL} from "../../libs/config/settings.js";
import PropTypes from "prop-types";

const WidgetBarangChoice = ({ callback }) => {
  const http = useHTTP();
  const jwt = useJWT();
  const message = useMessage();

  const [daftarBarang, setDaftarBarang] = useState([]);
  const [daftarBarangPagination, setDaftarBarangPagination] = useState({})
  const barangSearch = useRef({value: ""})

  const onBarangList = (params) => {
    const url = `${BASE_URL}/barang/`;
    const config = {
      headers: {
        Authorization: jwt.get(),
      },
      params
    }
    http.privateHTTP.get(url, config).then((response) => {
      const { results, ...pagination } = response.data;
      setDaftarBarangPagination(pagination);
      setDaftarBarang(results)
    }).catch((error) => {
      message.error(error);
    })
  }

  const onBarangSearch = (e) => {
    if (e.key == 'Enter') {
      onBarangList({search: barangSearch.current.value})
    }
  }

  const onBarangPagination = (page) => {
    onBarangList({search: barangSearch.current.value, page})
  }

  const onPilih = (barang) => {
    callback(barang)
  }

  useEffect(() => {
    onBarangList()
  }, []);

  return (
    <Card>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>
          <Form.Control
            ref={barangSearch}
            onKeyDown={onBarangSearch}
            placeholder={"Search..."}
          />
        </ListGroup.Item>
        {daftarBarang.map((value, index) => (
          <ListGroup.Item key={index} className={"d-flex justify-content-between"}>
            <div>{value.nama}</div>
            <Button size={"sm"} onClick={() => onPilih(value)}>Pilih</Button>
          </ListGroup.Item>
        ))}
      </ListGroup>

      <Card.Footer>
        <Pagination>
          <Pagination.First disabled={!daftarBarangPagination.previous}
                            onClick={() => onBarangPagination(1)} />
          {daftarBarangPagination?.pages?.map((page) => (
            <Pagination.Item
              onClick={() => onBarangPagination(page.page)}
              key={page.page}>{page.page}</Pagination.Item>
          ))}
          <Pagination.Last disabled={!daftarBarangPagination.next}
                           onClick={() => onBarangPagination(daftarBarangPagination.totalPage)} />
        </Pagination>
      </Card.Footer>
    </Card>
  )
}

WidgetBarangChoice.propTypes = {
  callback: PropTypes.func
}

export default WidgetBarangChoice;