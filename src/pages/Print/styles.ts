import styled from "styled-components";

export const Container = styled.div``;

export const InputLine = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 40px;
  align-items: center;
  padding: 0 10px;
`;

export const ItemsPurchasedContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;
`;
export const Divisor = styled.div`
  height: 2px;
  width: 500px;
  max-width: 80%;

  margin-bottom: 10px;

  background-color: #9eadba;
`;
export const Text = styled.div`
  color: #9eadba;
  margin-bottom: 20px;
`;
export const TitleProducts = styled.div`
  font-weight: 500;
`;
