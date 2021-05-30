import React from "react";

import { Container, Icon, Title, Text, IconContainer } from "./styles";

interface CardProps {
  title: string;
  text: string;
  icon: string;
}

const Card: React.FC<CardProps> = ({ title, text, icon }) => {
  return (
    <Container>
      <Title>{title}</Title>
      <Text>{text}</Text>
      <IconContainer>
        <Icon />
      </IconContainer>
    </Container>
  );
};

export default Card;
