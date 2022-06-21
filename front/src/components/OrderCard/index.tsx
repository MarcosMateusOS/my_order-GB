import React, { useState, useEffect } from "react";
import { Container, Status, Footer } from "./styles";

import { Modal, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import HistoryStatusCard from "../HistoryStatusCard";
import { IStatusHistory } from "../../interfaces/status-history.inteface";
import api from "../../service/api/api";
import moment from "moment";
import { IStatus } from "../../interfaces/status.interface";
import { useNavigate } from "react-router-dom";

interface IOrderCard {
  id_order: string;
  card_color: string;
  status_color: string;
  product: string;
  value: string;
  date_order: string;
}

const OrderCard: React.FC<IOrderCard> = ({
  id_order,
  card_color,
  status_color,
  product,
  value,
  date_order,
}) => {
  const [histories, setHistories] = useState<IStatusHistory[]>([]);
  const [statusUpdate, setStatusUpdate] = useState("");
  const [status, setStatus] = useState<IStatus[]>([]);
  const navigate = useNavigate();

  async function loadStatus() {
    await api.get("/status").then((response) => {
      setStatus(response.data);
    });
  }

  async function loadHistories() {
    await api.get(`/histories/${id_order}`).then((response) => {
      console.log(response.data);
      setHistories(response.data);
    });
  }

  async function updateStatusOrder() {
    await api
      .put(`/orders/${id_order}`, {
        status: statusUpdate,
      })
      .then(() => {
        window.location.reload();
      });
  }

  useEffect(() => {
    loadStatus();
  }, []);

  useEffect(() => {
    loadHistories();
  }, []);

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);
  const handleUpdate = () => {
    updateStatusOrder();
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Historico de Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {histories.map((history, index) => (
            <HistoryStatusCard
              key={index}
              card_color="#313862"
              status_color={history.status.hex_color}
              status={history.status.nm_status}
              created_at={moment(history.created_at).utc().format("DD/MM/YYYY")}
            ></HistoryStatusCard>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Footer>
            <div>
              <Form.Label>Atualizar Status do Pedido</Form.Label>
              <Form.Select
                aria-label="Floating label select example"
                onChange={(e) => setStatusUpdate(e.target.value)}
              >
                <option>Atualizar Status do Pedido</option>
                {status.map((status) => (
                  <option key={status._id} value={status._id}>
                    {status.nm_status}
                  </option>
                ))}
              </Form.Select>
            </div>

            <Button variant="primary" onClick={handleUpdate}>
              Atualizar Status
            </Button>
          </Footer>
        </Modal.Footer>
      </Modal>

      <Container color={card_color} onClick={handleShow}>
        <Status color={status_color} />
        <div>
          <span>{product}</span>
          <small>{date_order}</small>
        </div>
        <h3>{value}</h3>
      </Container>
    </>
  );
};

export default OrderCard;
