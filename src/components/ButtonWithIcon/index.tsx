import React from "react";
import { IconType } from "react-icons/lib";

import { Container } from "./styles";

interface ButtonWithIconProps {
  Icon: IconType;
  onClick?: () => void;
  style?: React.CSSProperties;
}

const ButtonWithIcon: React.FC<ButtonWithIconProps> = ({
  Icon,
  onClick,
  style,
}) => {
  return (
    <Container onClick={onClick} style={style}>
      <Icon color="#fff" fontSize={17} />
    </Container>
  );
};

export default ButtonWithIcon;
