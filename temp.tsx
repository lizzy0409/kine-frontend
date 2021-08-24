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

import styled from "styled-components";

import { IoCloseSharp } from "react-icons/io5";

interface ProductProps {
  name: string;
  value: number;
  quantity: number;
  measureUnit: string;
  costCenter: string;
}

interface ModalProps {
  title: string;

  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  addProduct: (product: ProductProps) => void;
}

const Modal: React.FC<ModalProps> = ({ setOpenModal, addProduct }) => {
  const [name, setName] = useState("");
  const [value, setValue] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0);
  const [measureUnit, setMeasureUnit] = useState("");
  const [costCenter, setCostCenter] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const product: ProductProps = {
      name,
      value,
      quantity,
      measureUnit,
      costCenter,
    };
    addProduct(product);
    setOpenModal(false);
  }

  return (
    <Wrapper>
      <Container onSubmit={handleSubmit}>
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
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <Input
              label="Valor Unitário"
              placeholder="Insira o Valor do Item"
              type={"number"}
              value={value === 0 ? "" : value}
              onChange={(e) => {
                setValue(Number(e.target.value));
              }}
            />
            <Input
              label="Quantidade"
              placeholder="Insira a Quantidade Comprada"
              type={"number"}
              value={quantity === 0 ? "" : quantity}
              onChange={(e) => {
                setQuantity(Number(e.target.value));
              }}
            />
            <Input
              label="Unidade de Medida"
              placeholder="Selecione a quantidade"
              value={measureUnit}
              onChange={(e) => {
                setMeasureUnit(e.target.value);
              }}
            />
            <Input
              label="Centro de Custo"
              placeholder="Selecione a Categoria do Produto"
              value={costCenter}
              onChange={(e) => {
                setCostCenter(e.target.value);
              }}
            />
          </div>
          <ButtonsContainer>
            <Button
              type="button"
              outline
              color="#6558F5"
              onClick={() => {
                setOpenModal(false);
              }}
            >
              Cancelar
            </Button>
            <Button type="submit" style={{ width: 160 }} color="#1AAE9F">
              Adicionar Produto
            </Button>
          </ButtonsContainer>
        </Content>
      </Container>
    </Wrapper>
  );
};

export default Modal;

export const Wrapper = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  z-index: 2;

  background-color: rgba(0, 0, 0, 0.7);
`;

export const Container = styled.form`
  width: 100%;
  max-width: 700px;

  background-color: #fff;

  border: 3px solid #c3cfd9;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 30px;
  border-bottom: 3px solid #9eadba;
`;
export const Title = styled.h1`
  font-size: 20px;
`;
export const CloseIcon = styled(IoCloseSharp)`
  color: #4b5c6b;
  font-size: 45px;

  cursor: pointer;
`;

export const Content = styled.div`
  padding: 24px;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 40px;
`;
