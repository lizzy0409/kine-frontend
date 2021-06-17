import styled from "styled-components";
import { FiPlusCircle } from "react-icons/fi";

export const Container = styled.form`
  padding: 24px;
  max-width: 800px;
  margin: 0 auto;
`;

export const ItemsPurchasedContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50px 0 40px 0;
`;
export const Divisor = styled.div`
  height: 2px;
  width: 500px;
  max-width: 80%;

  margin-bottom: 10px;

  background-color: #9eadba;
`;
export const Title = styled.div`
  font-weight: 500;
`;
export const Text = styled.div`
  color: #9eadba;
  margin-bottom: 20px;
`;
export const PlusIcon = styled(FiPlusCircle)`
  font-size: 20px;
  margin-right: 7px;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 30px 0;
`;
