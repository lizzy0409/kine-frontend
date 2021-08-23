import styled from "styled-components";

export const InputBlock = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 25px;
  margin-bottom: 25px;
  width: 85%;
`;

export const Input = styled.input`
  width: 100%;
  height: 45px;
  border: 0;
  border-radius: 10px;
  background-color: #f8f8f8;
  outline: 0;
  padding: 0 20px;
  font-size: 15px;
  &::placeholder {
    color: #777;
    font-size: 15px;
  }
  &:nth-child(n + 1) {
    margin-bottom: 10px;
  }
`;
