import React, { useEffect, useState } from "react";
import api from "../../services/api";

import {
  Container,
  ProductsTable,
  Product,
  Number,
  Name,
  GraphContainer,
  GraphContent,
  RightContainer,
  StockSize,
  TableHeader,
} from "./styles";

interface ProductProps {
  id: string;
  name: string;
  value: number;
  quantity: number;
  measureUnit: string;
  costCenter: string;
  stockLimit: number;
}

interface CurrentStockContentProps {
  changeValue: (value: number) => void;
  setPreData: React.Dispatch<React.SetStateAction<ProductProps | undefined>>;
}

const CurrentStockContent: React.FC<CurrentStockContentProps> = ({
  changeValue,
  setPreData,
}) => {
  const [products, setProducts] = useState<ProductProps[]>();

  async function getProducts() {
    try {
      const { data } = await api.get("/products");

      const dataParsed = data.map((product: any) => {
        return {
          name: product.name,
          quantity: product.qty_stocked,
          stockLimit: product.max_stock_limit,
        };
      });

      setProducts(dataParsed);
    } catch (error) {
      console.log(error);
    }
  }

  function getPercent(value: number, max: number) {
    return (value / max) * 100;
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Container>
      <ProductsTable>
        <TableHeader>
          <Number>Numero</Number>
          <Name>Nome do Produto</Name>
          <Name>Estado do Estoque</Name>
          <RightContainer>Quantidade em Estoque</RightContainer>
        </TableHeader>
        {products &&
          products.map((product, index) => (
            <Product>
              <Number>{(index + 1).toString().padStart(3, "0")}</Number>
              <Name>{product.name}</Name>
              <GraphContainer>
                <GraphContent
                  percent={getPercent(product.quantity, product.stockLimit)}
                />
              </GraphContainer>
              <RightContainer>
                <StockSize>{product.quantity}</StockSize>
              </RightContainer>
            </Product>
          ))}
      </ProductsTable>
    </Container>
  );
};
export default CurrentStockContent;
