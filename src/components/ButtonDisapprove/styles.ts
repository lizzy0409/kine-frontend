import styled from "styled-components";
import { IoCloseSharp } from "react-icons/io5";

export const Button = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background-color: #eb4740;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
  cursor: pointer;
  display: inline-flex;
`;

export const CloseIcon = styled(IoCloseSharp)`
  font-size: 19px;
  fill: #fff;
`;
