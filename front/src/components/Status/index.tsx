import React, { useEffect, useState } from "react";
import { IStatus } from "../../interfaces/status.interface";
import api from "../../service/api/api";
import { Content, StatusColor } from "./styles";

const Status: React.FC = ({}) => {
  const [status, setStatus] = useState<IStatus[]>([]);

  async function loadStatus() {
    await api.get("/status").then((response) => {
      console.log(response.data);
      setStatus(response.data);
    });
  }

  useEffect(() => {
    loadStatus();
  }, []);

  return (
    <Content>
      {status.map((status) => (
        <StatusColor key={status._id} color={status.hex_color}>
          <button
            type="button"
            className="tag-filter"
            onClick={(e) => {
              console.log(status.nm_status);
            }}
          >
            {status.nm_status}
          </button>
        </StatusColor>
      ))}
      {Status.length === 0 && <small>Nenhum status registrado.</small>}
    </Content>
  );
};

export default Status;
