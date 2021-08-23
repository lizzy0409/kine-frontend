import React from "react";

import { Container } from "./styles";

interface ButtonProps {
  color: string;
  outline?: boolean;
  disable?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  style?: React.CSSProperties;
  type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({
  color,
  outline,
  children,
  disable,
  onClick,
  style,
  type,
}) => {
  return (
    <Container
      onClick={onClick}
      disabled={disable}
      color={color}
      outline={!!outline}
      style={style}
      type={type}
    >
      {children}
    </Container>
  );
};

export default Button;
