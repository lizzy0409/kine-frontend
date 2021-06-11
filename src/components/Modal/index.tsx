import React, { FormEvent, useState } from "react";
import Button from "../Button";
import Input from "../Input";

import {
  Wrapper,
  Container,
  Header,
  Title,
  CloseIcon,
  Content,
  ButtonsContainer,
} from "./styles";

interface ProductProps {
  name: string;
  value: number;
  quantity: number;
  unitOfMeasure: string;
  costCenter: string;
}

interface ModalProps {
  title: string;
  handleSubmit: (e: FormEvent) => void;
  children: React.ReactNode[];

  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal = ({ title, children, setOpenModal, handleSubmit }: ModalProps) => {
  return (
    <Wrapper>
      <Container onSubmit={handleSubmit}>
        <Header>
          <Title>{title}</Title>
          <CloseIcon
            onClick={() => {
              setOpenModal(false);
            }}
          />
        </Header>
        <Content>
          {children[0]}
          <ButtonsContainer>{children[1]}</ButtonsContainer>
        </Content>
      </Container>
    </Wrapper>
  );
};

export default Modal;
