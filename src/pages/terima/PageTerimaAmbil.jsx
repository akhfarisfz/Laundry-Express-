import {useEffect, useRef, useState} from "react";
import {Form} from "react-bootstrap";
import useHTTP from "../../libs/hooks/useHTTP.jsx";
import useJWT from "../../libs/hooks/useJWT.jsx";
import useMessage from "../../libs/hooks/useMessage.jsx";
import {BASE_URL} from "../../libs/config/settings.js";

const PageTerimaAmbil = () => {

  const http = useHTTP();
  const jwt = useJWT();
  const message = useMessage();



  const [mock, setMock] = useState([])
  const data = useRef({value: ""})


  const onTerimaDiambil = (id) => {
    const url = `${BASE_URL}/terima/${id}/diambil/bynumber/`;

    const config = {
      headers: {
        Authorization: jwt.get()
      },
    }

    http.privateHTTP.put(url, null, config).then((response) => {
      message.success(response)
    }).catch((error) => {
      message.error(error)
    })
  }


  const addMock = (e) => {
    if (e.key === 'Enter') {
      onTerimaDiambil(data.current.value);
      data.current.value=""
    }
  }

  useEffect(() => {
    data.current.focus()
  }, []);

  return (
    <>
      <Form.Control
        ref={data}
        onKeyDown={addMock}

        onBlur={(e) => {
          e.relatedTarget
          e.target.focus()
        }}
      />

      <ul>
        {mock.map((value, index) => (
          <li key={index}>{value}</li>
        ))}
      </ul>
    </>
  )
}

export default PageTerimaAmbil;