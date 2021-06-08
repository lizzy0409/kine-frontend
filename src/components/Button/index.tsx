import React from "react";

import { Container } from "./styles";

interface ButtonProps {
  color: string;
  outline?: boolean;
  disable?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  style?: React.CSSProperties;
}

const Button: React.FC<ButtonProps> = ({
  color,
  outline,
  children,
  disable,
  onClick,
  style,
}) => {
  return (
    <Container
      onClick={onClick}
      disabled={disable}
      color={color}
      outline={!!outline}
      style={style}
    >
      {children}
    </Container>
  );
};

export default Button;
