import React from "react";
import { IconType } from "react-icons/lib";

import { Container } from "./styles";

interface ButtonWithIconProps {
  Icon: IconType;
  onClick?: () => void;
}

const ButtonWithIcon: React.FC<ButtonWithIconProps> = ({ Icon, onClick }) => {
  return (
    <Container onClick={onClick}>
      <Icon color="#fff" fontSize={17} />
    </Container>
  );
};

export default ButtonWithIcon;
