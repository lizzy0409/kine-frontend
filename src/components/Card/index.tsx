import React from "react";
import { IconType } from "react-icons/lib";

import { Container, Title, Text, IconContainer } from "./styles";

interface CardProps {
  title: string;
  text: string;
  Icon: IconType;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ title, text, Icon, onClick }) => {
  return (
    <Container onClick={onClick}>
      <Title>{title}</Title>
      <Text>{text}</Text>
      <IconContainer>
        <Icon className="icon" />
      </IconContainer>
    </Container>
  );
};

export default Card;
