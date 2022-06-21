import React, { useState, useEffect } from "react";
import ContentHeader from "../../components/ContentHeader";

import { IOrder } from "../../interfaces/ orders.interface";
import api from "../../service/api/api";
import { Container, Content, StatusColor, ContentFilter } from "./styles";
import moment from "moment";
import OrderCard from "../../components/OrderCard";
import { IStatus } from "../../interfaces/status.interface";

const History: React.FC = () => {
  const [order, setOrders] = useState<IOrder[]>([]);
  const [filters, setFilters] = useState<IStatus[]>([]);
  const [filterQuery, setFilterQuery] = useState<string | null>(null);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function loadOrders() {
    await api
      .get("/orders", { params: { status: filterQuery } })
      .then((response) => {
        if (response.status === 200) {
          setOrders(response.data);
          console.log(order);
        }
      });
  }

  useEffect(() => {
    loadStatus();
  }, []);

  useEffect(() => {
    loadOrders();
  }, [filterQuery]);

  async function loadStatus() {
    await api.get("/status").then((response) => {
      console.log(response.data);
      setFilters(response.data);
    });
  }

  return (
    <Container>
      <ContentHeader title="Histórico de pedidos" lineColor="#3b5998">
        <small>
          Os pedidos estão representados pelo seu status mais recente.
          <br />
          Click no pedido para visualizar seu histórico e atualiza-lo.
        </small>
      </ContentHeader>
      <h5>Status:</h5>
      <ContentFilter>
        <StatusColor key={1} color={"#3b5998"}>
          <button
            type="button"
            className="tag-filter"
            onClick={() => {
              setFilterQuery(null);
            }}
          >
            Todos
          </button>
        </StatusColor>

        {filters.map((status) => (
          <StatusColor key={status._id} color={status.hex_color}>
            <button
              type="button"
              className="tag-filter"
              onClick={() => {
                setFilterQuery(status._id);
              }}
            >
              {status.nm_status}
            </button>
          </StatusColor>
        ))}
      </ContentFilter>

      <Content>
        {order.map((order) => (
          <OrderCard
            key={order._id}
            id_order={order._id}
            card_color="#313862"
            status_color={order.status.hex_color}
            product={order.product}
            value={`R$ ${order.value}`}
            date_order={moment(order.date_order).utc().format("DD/MM/YYYY")}
          />
        ))}
        {order.length === 0 && (
          <small>Nenhum pedido registrado com esse status.</small>
        )}
      </Content>
    </Container>
  );
};

export default History;
