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
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  addProduct: (product: ProductProps) => void;
}

const Modal: React.FC<ModalProps> = ({ setOpenModal, addProduct }) => {
  const [name, setName] = useState("");
  const [value, setValue] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0);
  const [unitOfMeasure, setUnitOfMeasure] = useState("");
  const [costCenter, setCostCenter] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const product: ProductProps = {
      name,
      value,
      quantity,
      unitOfMeasure,
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
              value={unitOfMeasure}
              onChange={(e) => {
                setUnitOfMeasure(e.target.value);
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
