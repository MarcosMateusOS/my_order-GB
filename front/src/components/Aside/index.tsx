import React from "react";
import {
  Container,
  Header,
  LogImg,
  MenuContainer,
  MenuItemLink,
  Title,
} from "./styles";

import { MdHistory, MdNoteAdd, MdWork } from "react-icons/md";

import logoImg from "../../assets/logo.svg";

const Aside: React.FC = () => {
  return (
    <Container>
      <Header>
        <LogImg src={logoImg} alt="Logo My Request" />
        <Title>My Orders</Title>
      </Header>

      <MenuContainer>
        <MenuItemLink href="/history">
          <MdHistory />
          Histórico de pedidos
        </MenuItemLink>

        <MenuItemLink href="/store">
          <MdNoteAdd />
          Cadastrar um pedido
        </MenuItemLink>

        <MenuItemLink href="/admin">
          <MdWork />
          Área do Admin
        </MenuItemLink>
      </MenuContainer>
    </Container>
  );
};

export default Aside;
