import React, { FormEvent } from "react";

import {
  Wrapper,
  Container,
  Header,
  Title,
  CloseIcon,
  Content,
  ButtonsContainer,
} from "./styles";

interface ModalProps {
  title: string;
  handleSubmit: (e: FormEvent) => void;
  children: React.ReactNode[];

  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  style?: React.CSSProperties;
}

const Modal = ({
  title,
  children,
  setOpenModal,
  handleSubmit,
  style,
}: ModalProps) => {
  return (
    <Wrapper style={style}>
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
