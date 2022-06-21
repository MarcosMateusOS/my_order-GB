import styled from "styled-components";
import { IStatusColor } from "../../interfaces/status-color.interface";

export const Content = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-left: 10px;
  margin-bottom: 30px;
  .tag-filter {
    font-size: 18px;
    font-weight: 500;
    background: none;
    color: ${(props) => props.theme.color.info};

    margin: 0 10px;

    transition: opacity 0.3s;

    :hover {
      opacity: 0.7;
    }
  }
`;

export const StatusColor = styled.div<IStatusColor>`
  &::after {
    content: "";
    display: block;
    width: 40px;
    margin: 0 auto;
    border-bottom: 10px solid ${(props) => props.color};
  }
  > small {
    color: ${(props) => props.theme.color.warning};
  }
`;
