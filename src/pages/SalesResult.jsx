import {useLocation, useNavigate} from "react-router-dom";
import {Button, Col, Container, Row, Table} from "react-bootstrap";

const SalesResult = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const formatCurrency = (num) => {
    return new Intl.NumberFormat(
      'id-ID',
      { style: 'currency', currency: 'IDR' }).format(
      num,
    )
  }

  return (
    <>
      <Container className={"mt-5"}>
        <h1 className={"text-center"}>Sales</h1>
      </Container>
      <Container className={"mt-5 font-monospace"}>
        <Row className={"d-flex justify-content-center"}>
          <Col md={6}>
            <Table responsive={true}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
              {state?.carts?.map((obj) => (
                <tr key={obj.id}>
                  <td>{obj.id}</td>
                  <td>{obj.title}</td>
                  <td>{formatCurrency(obj.price)}</td>
                  <td>{obj.quantity}</td>
                  <td>{formatCurrency(obj.subtotal)}</td>
                </tr>
              ))}
              <tr>
                <td colSpan={4}>Total</td>
                <td className={"fw-bold fs-5"}>
                  {formatCurrency(state?.summary)}
                </td>
              </tr>
              <tr>
                <td colSpan={4}>Bayar</td>
                <td className={"fw-bold fs-5"}>
                  {formatCurrency(state?.pembayaran?.bayar)}
                </td>
              </tr>
              <tr>
                <td colSpan={4}>Potongan</td>
                <td className={"fw-bold fs-5"}>
                  {formatCurrency(state?.pembayaran?.discount)}
                </td>
              </tr>
              <tr>
                <td colSpan={4}>Kembalian</td>
                <td className={"fw-bold fs-5"}>
                  {formatCurrency(state?.pembayaran?.kembali)}
                </td>
              </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row className={"d-flex justify-content-center"}>
          <Col md={6} className={"d-flex justify-content-center gap-2"}>
            <Button className={"d-print-none"} onClick={() => navigate(-1)}>Back</Button>
            <Button className={"d-print-none"} onClick={window.print}>Print</Button>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default SalesResult;