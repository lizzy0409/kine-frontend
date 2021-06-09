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
import MyTableExcel from "../ExcelTabel";

interface ProductProps {
  name: string;
  value: number;
  quantity: number;
  unitOfMeasure: string;
  costCenter: string;
}

const NewPurchase = () => {
  const [openModal, setOpenModal] = useState(false);
  const [products, setProducts] = useState<ProductProps[]>([]);

  function addProduct(product: ProductProps) {
    setProducts([...products, product]);
  }

  return (
    <Container>
      {openModal && (
        <Modal addProduct={addProduct} setOpenModal={setOpenModal} />
      )}
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
        {products.length ? (
          <MyTableExcel data={products} setData={setProducts} />
        ) : (
          <Text>Sem itens alocados a essa OS</Text>
        )}
        <Button
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
        <Button outline color="#6558F5">
          Cancelar
        </Button>
        <Button style={{ padding: "0 35px" }} color="#1AAE9F">
          Salvar
        </Button>
      </ButtonsContainer>
    </Container>
  );
};

export default NewPurchase;
