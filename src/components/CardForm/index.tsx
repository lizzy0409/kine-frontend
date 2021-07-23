import React, { FormEvent } from "react";
import { Link } from "react-router-dom";

import { Wrapper, Container, Title, Subtitle, Button } from "./styles";

interface CardFormProps {
  style?: React.CSSProperties;
  title: string;
  subtitle?: string;
  subtitleLink?: string;
  subtitleLinkHref?: string;
  buttonTitle: string;
  onSubmit: (e: FormEvent) => void;
}

const CardForm: React.FC<CardFormProps> = ({
  style,
  title,
  subtitle,
  subtitleLink,
  buttonTitle,
  subtitleLinkHref,
  onSubmit,
  children: inputs,
}) => {
  return (
    <Wrapper onSubmit={onSubmit} style={style}>
      <Container>
        <Title>{title}</Title>
        {subtitle && subtitleLink && subtitleLinkHref && (
          <Subtitle>
            {subtitle} <Link to={subtitleLinkHref}>{subtitleLink}</Link>
          </Subtitle>
        )}

        {inputs}

        <Button>{buttonTitle}</Button>
      </Container>
    </Wrapper>
  );
};

export default CardForm;
