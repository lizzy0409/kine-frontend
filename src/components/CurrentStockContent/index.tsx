import React from "react";
import Button from "../Button";

import {
  Container,
  ProductsTable,
  Product,
  Number,
  Name,
  GraphContainer,
  GraphContent,
  ButtonContainer,
} from "./styles";

const CurrentStockContent = () => {
  return (
    <Container>
      <ProductsTable>
        <Product>
          <Number>001</Number>
          <Name>Produto 01</Name>
          <GraphContainer>
            <GraphContent percent={80} />
          </GraphContainer>
          <ButtonContainer>
            <Button disable={80 > 70} color={"#6558f5"}>
              Comprar
            </Button>
          </ButtonContainer>
        </Product>
      </ProductsTable>
      <ProductsTable>
        <Product>
          <Number>002</Number>
          <Name>Produto 02</Name>
          <GraphContainer>
            <GraphContent percent={40} />
          </GraphContainer>
          <ButtonContainer>
            <Button color={"#6558f5"}>Comprar</Button>
          </ButtonContainer>
        </Product>
      </ProductsTable>
      <ProductsTable>
        <Product>
          <Number>003</Number>
          <Name>Produto 03</Name>
          <GraphContainer>
            <GraphContent percent={25} />
          </GraphContainer>
          <ButtonContainer>
            <Button color={"#6558f5"}>Comprar</Button>
          </ButtonContainer>
        </Product>
      </ProductsTable>
    </Container>
  );
};
export default CurrentStockContent;
