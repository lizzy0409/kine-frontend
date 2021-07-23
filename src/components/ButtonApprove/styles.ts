import styled from "styled-components";
import { BsCheck } from "react-icons/bs";

export const Button = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background-color: #008000;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
  cursor: pointer;
  display: inline-flex;
`;

export const CheckIcon = styled(BsCheck)`
  font-size: 19px;
  fill: #fff;
`;
