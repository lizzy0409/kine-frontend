import React, { useContext } from "react";
import { Container, OpenMenuIcon, Left, Middle, Right } from "./styles";

import HeaderLogo from "../../assets/logoKine.png";
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
      <Right src={HeaderLogo} />
    </Container>
  );
};

export default Header;
