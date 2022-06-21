import styled, { keyframes } from "styled-components";
import { IStatusColor } from "../../interfaces/status-color.interface";
const animate = keyframes`
    0% {
        transform: translateX(-100px);
        opacity: 0;
    }
    50%{
        opacity: .3;
    }
    100%{
        transform: translateX(0px);
        opacity: 1;
    }
`;

export const Container = styled.div``;

export const Content = styled.div`
  border-color: black;
  display: flex;
  width: 100%;
  height: 100%;

  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  border: solid;
  border-radius: 10px;
  > small {
    color: ${(props) => props.theme.color.warning};
  }
`;
export const StatusColor = styled.div<IStatusColor>`
  animation: ${animate} 0.5s ease;
  &:hover {
    opacity: 0.7;
    transform: translateX(10px);
  }
  &::after {
    content: "";
    display: block;
    width: 40px;
    margin: 0 auto;
    border-bottom: 10px solid ${(props) => props.color};
  }
`;

export const ContentFilter = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-left: 10px;
  margin-bottom: 30px;
  > small {
    color: ${(props) => props.theme.color.warning};
  }

  .tag-filter {
    font-size: 18px;
    font-weight: 500;
    background: none;
    color: ${(props) => props.theme.color.info};

    margin: 0 10px;

    transition: opacity 0.3s;

    :hover {
      opacity: 0.8;
    }
  }
`;
