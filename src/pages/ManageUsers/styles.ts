import styled from "styled-components";

interface SidebarOpen {
  open: boolean;
}

interface ContainerProps extends SidebarOpen {}

export const Container = styled.div<ContainerProps>`
  min-height: 100vh;
  background-color: #dfe6ed;
  padding: 120px 30px;

  padding-left: ${({ open }) => (open ? "330px" : "30px")};

  transition: padding-left 0.5s;
`;

export const Section = styled.section`
  max-width: 1300px;
  margin: 0 auto 70px auto;
`;

export const Title = styled.h1`
  color: #293845;
  font-size: 35px;
`;
