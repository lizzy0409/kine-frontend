import styled from "styled-components";

import { FiPlus, FiPlusCircle } from "react-icons/fi";

interface SidebarOpen {
  open: boolean;
}

interface ContainerProps extends SidebarOpen {}

export const Container = styled.div<ContainerProps>`
  padding: 80px 20px 20px 20px;
  height: 100%;
  min-height: 100vh;
  max-width: 100vw;
  background-color: #dfe6ed;

  padding-left: ${({ open }) => (open ? "330px" : "30px")};

  transition: padding-left 0.5s;
`;

export const InputLine = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 40px;
  align-items: center;
  padding: 0 10px;
`;

export const Label = styled.label`
  text-align: center;

  &.label-top {
    font-size: 15px;
    color: #788896;
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin: 0 auto;
  max-width: 1200px;
  width: 100%;
`;

export const PlusIcon = styled(FiPlus)`
  font-size: 20px;
  margin-right: 3px;
`;

export const PlusCircleIcon = styled(FiPlusCircle)`
  font-size: 20px;
  margin-right: 3px;
`;

export const Section = styled.section`
  margin: 0 auto;
  max-width: 1200px;
  width: 100%;

  margin-bottom: 20px;
`;
export const Title = styled.h1`
  color: #293845;
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
