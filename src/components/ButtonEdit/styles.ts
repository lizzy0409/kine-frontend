import styled from "styled-components";
import { MdEdit } from "react-icons/md";

export const Button = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background-color: #f1c40f;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
  cursor: pointer;
  display: inline-flex;
`;

export const EditIcon = styled(MdEdit)`
  font-size: 19px;
  fill: #fff;
`;
