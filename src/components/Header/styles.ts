import styled from "styled-components";

import { FiMenu } from "react-icons/fi";

export const Container = styled.div`
  position: fixed;
  background-color: #ffffff;
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
  border-bottom: 3px solid #c3cfd9;
`;

export const OpenMenuIcon = styled(FiMenu)`
  font-size: 25px;
  color: #788896;
`;

export const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 18px;
  color: #c3cfd9;
  font-weight: 700;
  cursor: pointer;
`;
export const Middle = styled.h1`
  color: #293845;
  font-size: 28px;
`;

export const Right = styled.img`
  width: 100px;
`;
