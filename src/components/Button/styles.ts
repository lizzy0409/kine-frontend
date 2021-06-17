import styled from "styled-components";

interface ContainerProps {
  color: string;
  outline: boolean;
}

export const Container = styled.button<ContainerProps>`
  display: flex;
  justify-content: center;
  align-items: center;

  font-weight: 500;
  font-size: 16px;

  padding: 0 15px;

  height: 40px;
  background-color: ${({ outline, color }) => (outline ? "#fff" : color)};

  border: ${({ outline, color }) =>
    outline ? `2px solid ${color}88` : "none"};

  color: ${({ outline, color }) => (outline ? color : "#fff")};

  border-radius: 5px;
  cursor: pointer;

  &:disabled {
    background-color: #c9ced2;
    color: #fff;
    cursor: default;
  }
`;
