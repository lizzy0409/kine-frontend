import styled from "styled-components";

interface SidebarOpen {
  open: boolean;
}

interface ContainerProps extends SidebarOpen {}

export const Container = styled.div<ContainerProps>`
  height: 100%;
  min-height: 100vh;
  padding-top: 80px;
  padding-bottom: 20px;
  background-color: #dfe6ed;

  padding-left: ${({ open }) => (open ? "300px" : "0px")};

  transition: padding-left 0.5s;
`;
