import styled from "styled-components";
import InputSearch from "../InputSearch";

export const InputContainer = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 2.5fr;
  gap: 60px;

  margin-bottom: 30px;
`;
export const Label = styled.label`
  text-align: center;
`;

export const InputStyled = styled.input`
  height: 40px;

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
