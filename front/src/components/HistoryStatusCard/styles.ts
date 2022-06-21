import styled, { keyframes } from "styled-components";

interface IStatusProps {
  color: string;
}

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

export const Container = styled.li`
  background-color: ${(props) => props.theme.color.gray};
  width: 100%;
  height: 50px;
  list-style: none;
  border-radius: 10px;

  margin: 10px 0;
  padding: 12px 10px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  cursor: pointer;
  transition: all 0.3s;

  position: relative;

  animation: ${animate} 0.5s ease;

  &:hover {
    opacity: 0.7;
    transform: translateX(10px);
  }

  > div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-left: 10px;
  }

  > div span {
    font-size: 22px;
    font-weight: 500;
    color: #3b5998;
    margin-bottom: 12px;
  }
  > h3 {
    font-size: 22px;
    color: #3b5998;
  }
`;

export const Status = styled.div<IStatusProps>`
  width: 13px;
  height: 50%;

  background-color: ${(props) => props.color};

  position: absolute;
  left: 0;
`;
