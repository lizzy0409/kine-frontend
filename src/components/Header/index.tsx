import React from "react";
import { Container, OpenMenuIcon, Left, Middle, Right } from "./styles";

import GoogleLogo from "../../assets/google.png";

interface HeaderProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: React.FC<HeaderProps> = ({ setOpen }) => {
  return (
    <Container>
      <Left onClick={() => setOpen(true)}>
        <OpenMenuIcon /> Abrir menu
      </Left>
      <Middle>Início</Middle>
      <Right src={GoogleLogo} />
    </Container>
  );
};

export default Header;
