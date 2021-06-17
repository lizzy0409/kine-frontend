import styled from "styled-components";

export const InputStyled = styled.input`
  height: 40px;
  width: 100%;

  border: 2px solid #c5ced6;
  border-radius: 5px;

  padding: 5px 10px;

  font-size: 16px;
  color: #9f9f9f;

  &::placeholder {
    color: #c3cfd9;
    font-size: 17px;
  }
  &:focus {
    border-color: #6558f5;
  }
  outline: none;
`;
