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

interface CurrentStockContentProps {
  setTabIndex: React.Dispatch<React.SetStateAction<number>>;
}

const CurrentStockContent: React.FC<CurrentStockContentProps> = ({
  setTabIndex,
}) => {
  return (
    <Container>
      <ProductsTable>
        <Product>
          <Number>001</Number>
          <Name>Produto 01</Name>
          <GraphContainer>
            <GraphContent percent={90} />
          </GraphContainer>
          <ButtonContainer>
            <Button disable={90 >= 85} color={"#6558f5"}>
              Comprar
            </Button>
          </ButtonContainer>
        </Product>

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
