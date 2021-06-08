import Modal from "../Modal";
import React, { useState } from "react";
import Button from "../Button";

import Input from "../Input";

import {
  Container,
  ItemsPurchasedContainer,
  Divisor,
  Title,
  Text,
  PlusIcon,
  ButtonsContainer,
} from "./styles";

const NewPurchase = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <Container>
      {openModal && <Modal setOpenModal={setOpenModal} />}
      <div>
        <Input label="Fornecedor" placeholder="Informe o Fornecedor" />
        <Input
          label="Valor Total da Compra"
          placeholder="Informe o valor total da compra"
        />
      </div>
      <ItemsPurchasedContainer>
        <Divisor />
        <Title>Itens adquiridos</Title>
        <Text>Sem itens alocados a essa OS</Text>
        <Button
          style={{ width: "auto", padding: "10px" }}
          outline
          color="#6558F5"
          onClick={() => {
            setOpenModal(true);
          }}
        >
          <PlusIcon /> Adicionar Produtos ao Estoque
        </Button>
      </ItemsPurchasedContainer>
      <ButtonsContainer>
        <Button style={{ width: 110 }} outline color="#6558F5">
          Cancelar
        </Button>
        <Button style={{ width: 110 }} color="#1AAE9F">
          Salvar
        </Button>
      </ButtonsContainer>
    </Container>
  );
};

export default NewPurchase;
