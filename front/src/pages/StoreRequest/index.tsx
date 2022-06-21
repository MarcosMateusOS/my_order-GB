import React, { useEffect, useState } from "react";

import { Form, Button, FloatingLabel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import CurrencyInput from "react-currency-input-field";
import { Container, Content, SubForms } from "./styles";
import ContentHeader from "../../components/ContentHeader";
import api from "../../service/api/api";
import { useNavigate } from "react-router-dom";
import { IStatus } from "../../interfaces/status.interface";
import moment from "moment";

const StoreRequest: React.FC = () => {
  const [isLoading, setLoading] = useState(false);
  const [validated, setValidated] = useState(false);
  const [product, setProduct] = useState("");
  const [statusStore, setStatusStore] = useState("");
  const [value, setValue] = useState<string | undefined>("");
  const [dateOrder, setDateOrder] = useState("");

  const [status, setStatus] = useState<IStatus[]>([]);

  async function loadStatus() {
    await api.get("/status").then((response) => {
      setStatus(response.data);
    });
  }
  const navigate = useNavigate();

  async function store() {
    await api
      .post("/orders", {
        product,
        value,
        date_order: dateOrder,
        status: statusStore,
      })
      .then(() => {
        setLoading(false);
        navigate("/history");
      });
  }

  useEffect(() => {
    if (isLoading) {
    }
  }, [isLoading]);

  useEffect(() => {
    loadStatus();
  }, []);

  const handleClick = (event: any) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      setValidated(true);
      store();
    }
  };

  return (
    <Container>
      <ContentHeader lineColor="#007500" children title="Cadastro de Pedido" />
      <Content>
        <Form noValidate validated={validated} onSubmit={handleClick}>
          <Form.Group className="mb-3">
            <Form.Label class="text-dark">Produto</Form.Label>
            <Form.Control
              type="textarea"
              placeholder="Nome do produto"
              required
              onChange={(e) => {
                setProduct(e.target.value);
              }}
            />
            <Form.Control.Feedback type="invalid">
              Nome do produto é obrigatório.
            </Form.Control.Feedback>
          </Form.Group>

          <SubForms>
            <div>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
                color="red
                "
              >
                <Form.Label class="text-dark">Valor do produto</Form.Label>

                <CurrencyInput
                  id="input-example"
                  name="input-name"
                  placeholder="Digite o valor do produto"
                  prefix="R$"
                  className={`form-control`}
                  decimalsLimit={2}
                  required
                  onValueChange={(value, name) => setValue(value)}
                />
                <Form.Control.Feedback type="invalid">
                  Valor do produto obrigatório.
                </Form.Control.Feedback>
              </Form.Group>
            </div>

            <div>
              <Form.Label class="text-dark">Status do pedido</Form.Label>
              <Form.Select
                aria-label="Floating label select example"
                required
                onChange={(e) => setStatusStore(e.target.value)}
              >
                <option>Selecione o status do seu pedido</option>
                {status.map((status) => (
                  <option key={status._id} value={status._id}>
                    {status.nm_status}
                  </option>
                ))}
                <Form.Control.Feedback type="invalid">
                  Valor do produto obrigatório.
                </Form.Control.Feedback>
              </Form.Select>
            </div>

            <div>
              <Form.Group controlId="dob">
                <Form.Label class="text-dark">Data do pedido</Form.Label>
                <Form.Control
                  type="date"
                  name="dob"
                  required
                  defaultValue={"12/01/2020"}
                  placeholder="Data do pedido"
                  onChange={(e) => {
                    setDateOrder(e.target.value);
                  }}
                />
              </Form.Group>
            </div>
          </SubForms>
        </Form>
        <Button
          variant="primary"
          disabled={isLoading}
          type="submit"
          onClick={handleClick}
        >
          {isLoading ? "Cadastrando…" : "Cadastrar Pedido"}
        </Button>
      </Content>
    </Container>
  );
};

export default StoreRequest;
