import styled from "styled-components";

interface GraphProps {
  percent: number;
}

export const Container = styled.div`
  overflow-y: auto;
  max-height: calc((100vh - 100px) - 77px);
  padding: 24px;
`;
export const ProductsTable = styled.div``;
export const Product = styled.div`
  display: grid;
  align-items: center;
  text-align: center;
  font-weight: 500;
  grid-template-columns: 70px 1fr 2fr 1fr;
  grid-template-rows: 50px;

  border-bottom: 2px solid #9eadba;
  padding: 10px;
`;

export const Number = styled.span``;
export const Name = styled.span``;
export const GraphContainer = styled.div`
  height: 20px;
  border-radius: 5px;
  background-color: #d8dee3;
  position: relative;
`;
export const GraphContent = styled.div<GraphProps>`
  width: ${({ percent }) => percent}%;
  height: 100%;
  border-radius: ${({ percent }) => (percent === 100 ? "5px" : "5px 0 0 5px")};
  background-color: ${({ percent }) => {
    if (percent >= 30 && percent <= 50) {
      return "#F7C325";
    } else if (percent <= 30) {
      return "#D3455B";
    } else {
      return "#2C88D9";
    }
  }};
`;
export const RightContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const StockSize = styled.p``;
