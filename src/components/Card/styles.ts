import styled from "styled-components";

export const Container = styled.div`
  width: 250px;
  height: 200px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 25px 25px 15px 25px;
  cursor: pointer;

  & .icon {
    font-size: 35px;
    color: #4b5c6b;

    margin-bottom: -10px;
    margin-right: -10px;
  }
`;

export const Title = styled.h1`
  font-size: 22px;
  color: #293845;
  text-align: center;
`;

export const Text = styled.p`
  color: #788896;
  font-size: 15px;
`;
export const IconContainer = styled.div`
  align-self: flex-end;
`;
