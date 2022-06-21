import React, { useEffect, useState } from "react";

import { Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import {
  Container,
  Content,
  FormsArea,
  StatusTitle,
  TitleForms,
} from "./styles";

import ContentHeader from "../../components/ContentHeader";
import api from "../../service/api/api";
import { useNavigate } from "react-router-dom";
import Status from "../../components/Status";

const AdminArea: React.FC = () => {
  const [isLoading, setLoading] = useState(false);
  const [nmStatus, setNmStatus] = useState("");
  const [hexColor, setHexColor] = useState<string>("#563d7c");
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();

  async function store() {
    await api
      .post("/status", {
        nm_status: nmStatus,
        hex_color: hexColor,
      })
      .then(() => {
        setLoading(false);
        window.location.reload();

        //navigate("/history");
      })
      .catch((error) => {});
  }

  useEffect(() => {
    if (isLoading) {
    }
  }, [isLoading]);

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
      <ContentHeader lineColor="#FFC10A" children title="Área do admin" />
      <Content>
        <StatusTitle>Seus Status personalizados já cadastrados:</StatusTitle>
        <Status />

        <FormsArea>
          <TitleForms>Cadastre novos status:</TitleForms>
          <Form noValidate validated={validated} onSubmit={handleClick}>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Control
                type="textarea"
                placeholder="Status dos pedido"
                required
                onChange={(e) => {
                  setNmStatus(e.target.value);
                }}
              />
              <Form.Control.Feedback type="invalid">
                Status dos pedidos é obrigatório.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Selecione uma cor personalizada</Form.Label>
              <Form.Control
                type="color"
                id="exampleColorInput"
                defaultValue="#563d7c"
                title="Choose your color"
                onChange={(e) => {
                  setHexColor(e.target.value);
                }}
              />
            </Form.Group>

            <Button variant="primary" disabled={isLoading} type="submit">
              {isLoading ? "Cadastrando…" : "Cadastrar"}
            </Button>
          </Form>
        </FormsArea>
      </Content>
    </Container>
  );
};

export default AdminArea;
