import styled from "styled-components";

import { IoCloseSharp } from "react-icons/io5";

export const Wrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  z-index: 2;

  background-color: rgba(0, 0, 0, 0.7);
`;

export const Container = styled.form`
  width: 100%;
  max-width: 700px;

  background-color: #fff;

  border: 3px solid #c3cfd9;

  @media (max-width: 700px) {
    width: 100vw;
    height: 100vh;
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 30px;
  border-bottom: 3px solid #9eadba;
`;
export const Title = styled.h1`
  font-size: 20px;
  @media (max-width: 550px) {
    font-size: 15px;
  }
`;
export const CloseIcon = styled(IoCloseSharp)`
  color: #4b5c6b;
  font-size: 45px;

  cursor: pointer;
`;

export const Content = styled.div`
  padding: 24px;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 40px;
`;
