import {Button, Card, Col, Container, Form, Pagination, Row, Table} from "react-bootstrap";
import useHTTP from "../../libs/hooks/useHTTP.jsx";
import useJWT from "../../libs/hooks/useJWT.jsx";
import {useEffect, useRef, useState} from "react";
import useMessage from "../../libs/hooks/useMessage.jsx";
import {BASE_URL} from "../../libs/config/settings.js";
import useURLResolver from "../../libs/hooks/useURLResolver.jsx";
import {Link, useNavigate} from "react-router-dom";
const PageBarangList = () => {

  const navigate = useNavigate();

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

  useEffect(() => {
    onBarangList();
  }, []);

  return (
    <>
      <Container className={"mt-4"}>
        <Row className={"mb-4"}>
          <Col>
            <h3>Daftar Barang</h3>
          </Col>
          <Col className={"d-flex justify-content-end"}>
            <Button style={{backgroundColor:'#637A9F'}} onClick={() => navigate("new")}>New Barang</Button>
          </Col>
        </Row>
        <Row className={"mb-4"}>
          <Col md={12}>
            <Card>
              <Card.Body>
                <Row>
                  <Col>
                    <Form.Group>
                      <Form.Control
                        ref={barangSearch}
                        onKeyDown={onBarangSearch}
                        placeholder={"Search..."}
                        className={"w-50 bg-body-tertiary"} />
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
              <Table responsive={true} striped={true} borderless={true}>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nama</th>
                    <th>Created</th>
                  </tr>
                </thead>
                <tbody>
                {daftarBarang.map((value) => (
                  <tr key={value._id}>
                    <td>
                      <Link to={`/detail/${value._id}`} className={"text-decoration-none"}>{value._id}</Link>
                    </td>
                    <td>{value.nama}</td>
                    <td>{value.created}</td>
                  </tr>
                ))}
                </tbody>
              </Table>

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
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default PageBarangList;