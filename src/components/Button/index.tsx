import React from "react";

import { Container } from "./styles";

interface ButtonProps {
  color: string;
  outline?: boolean;
  disable?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  color,
  outline,
  children,
  disable,
}) => {
  return (
    <Container disabled={disable} color={color} outline={!!outline}>
      {children}
    </Container>
  );
};

export default Button;
