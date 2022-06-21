import React, { useState } from "react";
import { Container, Status } from "./styles";

interface IRequestStatusCard {
  card_color: string;
  status_color: string;
  status: string;
  created_at: string;
}

const HistoryStatusCard: React.FC<IRequestStatusCard> = ({
  card_color,
  status_color,
  status,
  created_at,
}) => {
  return (
    <Container color={card_color}>
      <Status color={status_color} />
      <div>
        <span>{status}</span>
      </div>
      <h3>{created_at}</h3>
    </Container>
  );
};

export default HistoryStatusCard;
