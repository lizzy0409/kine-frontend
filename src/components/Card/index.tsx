import React from "react";

import { Container, Icon, Title, Text, IconContainer } from "./styles";

interface CardProps {
  title: string;
  text: string;
  icon: string;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ title, text, icon, onClick }) => {
  return (
    <Container onClick={onClick}>
      <Title>{title}</Title>
      <Text>{text}</Text>
      <IconContainer>
        <Icon />
      </IconContainer>
    </Container>
  );
};

export default Card;
