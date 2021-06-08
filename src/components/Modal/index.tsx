import React from "react";
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

interface ModalProps {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal: React.FC<ModalProps> = ({ setOpenModal }) => {
  return (
    <Wrapper>
      <Container>
        <Header>
          <Title>Cadastrar Produto</Title>
          <CloseIcon
            onClick={() => {
              setOpenModal(false);
            }}
          />
        </Header>
        <Content>
          <div>
            <Input
              label="Nome do Produto"
              placeholder="Insira o nome do Produto"
            />
            <Input
              label="Valor Unitário"
              placeholder="Insira o Valor do Item"
            />
            <Input
              label="Quantidade"
              placeholder="Insira a Quantidade Comprada"
            />
            <Input
              label="Unidade de Medida"
              placeholder="Selecione a quantidade"
            />
            <Input
              label="Centro de Custo"
              placeholder="Selecione a Categoria do Produto"
            />
          </div>
          <ButtonsContainer>
            <Button style={{ width: 110 }} outline color="#6558F5">
              Cancelar
            </Button>
            <Button style={{ width: 160 }} color="#1AAE9F">
              Adicionar Produto
            </Button>
          </ButtonsContainer>
        </Content>
      </Container>
    </Wrapper>
  );
};

export default Modal;
