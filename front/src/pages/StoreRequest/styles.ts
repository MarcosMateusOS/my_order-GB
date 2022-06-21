import styled, { keyframes } from "styled-components";

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

export const Container = styled.div`
  grid-area: CT;
  color: ${(props) => props.theme.color.info};
  background-color: ${(props) => props.theme.color.primary};

  padding: 25px;

  justify-content: center;
`;

export const Content = styled.div`
  grid-area: CT;
  color: ${(props) => props.theme.color.white};
  background-color: ${(props) => props.theme.color.primary};

  padding: 25px;

  justify-content: center;

  animation: ${animate} 0.5s ease;
`;

export const SubForms = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;

  > div {
    margin-right: 25px;
  }
`;
