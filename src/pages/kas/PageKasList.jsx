import useHTTP from "../../libs/hooks/useHTTP.jsx";
import useJWT from "../../libs/hooks/useJWT.jsx";
import useMessage from "../../libs/hooks/useMessage.jsx";
import {useEffect, useRef, useState} from "react";
import {BASE_URL} from "../../libs/config/settings.js";
import {Button, Card, Col, Container, Form, Pagination, Row, Table} from "react-bootstrap";
import WidgetTerimaCreateModal from "../../widgets/terima/WidgetTerimaCreateModal.jsx";
import WidgetKasCreateModal from "../../widgets/kas/WidgetKasCreateModal.jsx";
import WidgetKasDetailModal from "../../widgets/kas/WidgetKasDetailModal.jsx";

const PageKasList = () => {
  const http = useHTTP();
  const jwt = useJWT();
  const message = useMessage();

  const [daftarKas, setDaftarKas] = useState([])
  const [kasPagination, setKasPagination] = useState({})
  const kasSearch = useRef({value: ""});

  const onKasList = (params) => {
    const url = `${BASE_URL}/kas/`
    const config = {
      headers: {
        Authorization: jwt.get()
      },
      params,
    }

    http.privateHTTP.get(url, config).then((response) => {
      const {results, ...pagination} = response.data;

      setDaftarKas(results);
      setKasPagination(pagination);
    }).catch((error) => {
      message.error(error);
    })
  }

  const onKasSearch = (e) => {
    if (e.key == 'Enter') {
      onKasList({search: kasSearch.current.value})
    }
  }

  const onKasPagination = (page) => {
    onKasList({search: kasSearch.current.value, page})
  }

  useEffect(() => {
    onKasList()
  }, []);

  return (
    <>
      <Container className={"mt-4"}>
        <Row className={"mb-4"}>
          <Col>
            <h3>Daftar kas laundry</h3>
          </Col>
          <Col className={"d-flex justify-content-end"}>
            <WidgetKasCreateModal callback={() => onKasList()} />
          </Col>
        </Row>
        <Row className={"mb-4"}>
          <Col>
            <Card>
              <Card.Body>
                <Form.Group>
                  <Form.Control
                    ref={kasSearch}
                    onKeyDown={onKasSearch}
                    placeholder={"Search..."}
                    className={"w-50 bg-body-tertiary"}
                  />
                </Form.Group>
              </Card.Body>
              <Table responsive={true} striped={true} borderless={true}>
                <thead>
                  <tr>
                    <th>Nomor Transaksi</th>
                    <th>Tanggal</th>
                    <th>Keterangan</th>
                    <th>Masuk</th>
                    <th>Keluar</th>
                  </tr>
                </thead>
                <tbody>
                {daftarKas.map((kas) => (
                  <tr key={kas._id}>
                    <td>
                      <WidgetKasDetailModal
                        id={kas._id}
                        nomorTransaksi={kas.nomorTransaksi}
                        callback={() => onKasList()}
                      />
                    </td>
                    <td>{kas.tanggal}</td>
                    <td>{kas.keterangan}</td>
                    <td>{kas.pemasukan}</td>
                    <td>{kas.pengeluaran}</td>
                  </tr>
                ))}
                </tbody>
              </Table>

              <Card.Footer>
                <Pagination>
                  <Pagination.First disabled={!kasPagination.previous}
                                    onClick={() => onKasPagination(1)} />
                  {kasPagination?.pages?.map((page) => (
                    <Pagination.Item
                      onClick={() => onKasPagination(page.page)}
                      key={page.page}>{page.page}</Pagination.Item>
                  ))}
                  <Pagination.Last disabled={!kasPagination.next}
                                   onClick={() => onKasPagination(kasPagination.totalPage)} />
                </Pagination>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default PageKasList;