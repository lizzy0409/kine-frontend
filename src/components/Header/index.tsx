import React, { useContext } from "react";
import { Container, OpenMenuIcon, Left, Middle, Right } from "./styles";

import GoogleLogo from "../../assets/google.png";
import { SideBarContext } from "../../contexts/SideBarContext";

interface HeaderProps {
  pageName: string;
}

const Header: React.FC<HeaderProps> = ({ pageName }) => {
  const { setOpen } = useContext(SideBarContext);
  return (
    <Container>
      <Left onClick={() => setOpen(true)}>
        <OpenMenuIcon /> Abrir menu
      </Left>
      <Middle>{pageName}</Middle>
      <Right src={GoogleLogo} />
    </Container>
  );
};

export default Header;
