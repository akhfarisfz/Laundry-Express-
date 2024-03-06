import PropTypes from "prop-types";
import {Badge} from "react-bootstrap";

const WidgetBadgeStatus = ({status}) => {
  if (status === 'diproses') {
    return <Badge bg="danger">{status}</Badge>
  }

  if (status === 'selesai') {
    return <Badge bg="warning">{status}</Badge>
  }

  if (status === 'diambil') {
    return <Badge bg="success">{status}</Badge>
  }
}

WidgetBadgeStatus.propTypes = {
  status: PropTypes.string
}

export default WidgetBadgeStatus;