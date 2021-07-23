import styled from "styled-components";
import { FiPlusCircle } from "react-icons/fi";

interface SidebarOpen {
  open: boolean;
}

interface WrapperProps extends SidebarOpen {}

export const Wrapper = styled.div<WrapperProps>`
  background-color: #dfe6ed;
  min-height: 100vh;
  padding-left: ${({ open }) => (open ? "300px" : "0px")};

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

export const PlusCircleIcon = styled(FiPlusCircle)`
  font-size: 20px;
  margin-right: 3px;
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 40px;
  max-width: 875px;
  margin: 0 auto;
  padding: 120px 20px;
`;
