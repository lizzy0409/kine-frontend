import React from "react";
import { Button, TrashIcon } from "./styles";

interface IButtonRemoveProduct {
  onClick?: () => void;
}

const ButtonRemoveProduct: React.FC<IButtonRemoveProduct> = ({ onClick }) => {
  return (
    <Button onClick={onClick}>
      <TrashIcon />
    </Button>
  );
};

export default ButtonRemoveProduct;
