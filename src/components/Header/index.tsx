import React from "react";
import { Container, Icon, Left, Middle, Right } from "./styles";

import GoogleLogo from "../../assets/google.png";

const Header: React.FC = () => {
  return (
    <Container>
      <Left>
        <Icon /> Abrir menu
      </Left>
      <Middle>Início</Middle>
      <Right src={GoogleLogo} />
    </Container>
  );
};

export default Header;
