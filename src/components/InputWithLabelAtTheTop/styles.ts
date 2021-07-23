import styled from "styled-components";

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;

  margin-bottom: 30px;
`;
export const Label = styled.h1`
  font-size: 16px;
  color: #4b5c6b;
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
    font-size: 15px;
  }
`;
