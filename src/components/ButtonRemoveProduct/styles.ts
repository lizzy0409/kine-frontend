import styled from "styled-components";
import { FaTrashAlt } from "react-icons/fa";

export const Button = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background-color: #d3455b;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
  cursor: pointer;
`;

export const TrashIcon = styled(FaTrashAlt)`
  font-size: 19px;
  fill: #fff;
`;
