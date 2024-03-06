import {useEffect, useMemo, useState} from "react";
import {Button, Card, Col, Container, Form, Row, Table} from "react-bootstrap";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const Sales = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([])
  const [product, setProduct] = useState({})
  const [carts, setCarts] = useState([]);
  const [pembayaran, setPembayaran] = useState({
    total: 0,
    bayar: 0,
    kembali: 0,
    discount: 0
  })

  const onProductList = () => {
    axios.get("https://6316526b82797be77fe34d6a.mockapi.io/products").then((response) => {
      setProducts(response.data)
    }).catch((error) => {
      console.log(error)
    })
  }

  const onSelectProduct = (value) => {
    setProduct(value);
  }

  const onChangeProduct = (e) => {
    const name = e.target.name;
    const value = parseInt(Number(e.target.value));
    setProduct({...product, [name]: value});
  }

  const onAddToCart = (value) => {
    const itemExist = carts.find((obj) => obj.id === value.id);
    if (itemExist?.id) {
      const indexExist = carts.findIndex((obj) => obj.id === value.id);
      itemExist.quantity += 1;
      itemExist.subtotal = itemExist.quantity * parseFloat(value.price);
      const tempCarts = [...carts]
      tempCarts.splice(indexExist, 1, itemExist)
      setCarts(tempCarts)
    } else {
      value.quantity = 1;
      value.subtotal = value.quantity * parseFloat(value.price);
      setCarts([...carts, value])
    }
  }

  const onChangeCart = (e) => {
    if (e.key === 'Enter') {
      if (product.quantity === 0) {
        const temps = carts.filter((value) => value.id !== product.id);
        setCarts(temps);
        return;
      }

      const index = carts.findIndex((value) => value.id === product.id);
      let tempCarts = carts.filter((value) => value.id !== product.id);
      product.subtotal = product.quantity * parseFloat(product.price);
      tempCarts.splice(index, 0, product)
      setCarts(tempCarts);
    }
  }

  const summary = useMemo(() => {
    let total = carts.reduce((nilaiUpdate, obj) => nilaiUpdate + obj.subtotal, 0) - pembayaran.discount
    if (total < 0) {
      total = 0;
    }
    setPembayaran({...pembayaran, total, bayar: 0, kembali: 0})
    return total;
  }, [carts, pembayaran.discount])

  const formatCurrency = (num) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(
      num,
    )
  }

  const navigateToSalesResult = () => {

    navigate("/sales-result", { state: { carts, pembayaran, summary, } })
  }

  useEffect(() => {
    onProductList();
  }, []);

  useEffect(() => {
    console.log("ini dipanggil nih....")
    const kembali = pembayaran.bayar - summary
    setPembayaran({...pembayaran, kembali});
  }, [pembayaran.bayar]);

  return (
    <>
      <Container className={"mt-5"}>
        <Row >
          <Col md={8} className={"d-flex flex-wrap justify-content-evenly row-gap-4 column-gap-1"}>
            {products.map((obj) => (
              <Card key={obj.id} className={"w-25"} onClick={() => onAddToCart(obj)}>
                <Card.Img variant="top" src={obj.image}/>
                <Card.Body>
                  <Card.Title>{obj.title} {obj.id}</Card.Title>
                  <Card.Text className={"text-truncate"}>{obj.description}</Card.Text>
                </Card.Body>
              </Card>
            ))}
          </Col>

          <Col md={4}>
            <Card>
              <Card.Body>
                <Card.Title>Transaksi</Card.Title>
              </Card.Body>
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
                {carts.map((obj) => (
                  <tr key={obj.id}>
                    <td>{obj.id}</td>
                    <td>{obj.title}</td>
                    <td>{formatCurrency(obj.price)}</td>

                    {product.id && product.id === obj.id ? (
                      <td>
                        <Form.Control
                          name={"quantity"}
                          onChange={onChangeProduct}
                          value={Number(product.quantity)}
                          onKeyUp={onChangeCart}
                          type={"number"}
                          autoFocus={true}/>
                      </td>
                    ) : (
                      <td onClick={() => onSelectProduct(obj)}>{obj.quantity}</td>
                    )}
                    <td>{formatCurrency(obj.subtotal)}</td>
                  </tr>
                ))}
                <tr>
                  <td colSpan={4}>Total</td>
                  <td className={"fw-bold fs-5"}>{summary === 0 ? "FREE" : formatCurrency(summary)}</td>
                </tr>
                <tr>
                  <td colSpan={4}>Discount</td>
                  <td className={"fw-bold fs-5"}>
                    <Form.Control
                      value={pembayaran.discount || 0}
                      onChange={(e) => setPembayaran({...pembayaran, discount: e.target.value})}
                    />
                  </td>
                </tr>
                <tr>
                  <td colSpan={4}>Dibayar</td>
                  <td className={"fw-bold fs-5"}>
                    <Form.Control
                      value={pembayaran.bayar || 0}
                      isValid={pembayaran.kembali >= 0}
                      isInvalid={pembayaran.kembali < 0}
                      onChange={(e) => setPembayaran({...pembayaran, bayar: e.target.value})}
                    />
                  </td>
                </tr>
                <tr>
                  <td colSpan={4}>Kembalian</td>
                  <td className={"fw-bold fs-5"}>
                    <Form.Control readOnly={true} value={pembayaran.kembali || 0}/>
                  </td>
                </tr>
                </tbody>
              </Table>
              <Card.Footer className={"d-flex justify-content-end"}>
                <Button onClick={navigateToSalesResult}>Selesai</Button>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Sales



