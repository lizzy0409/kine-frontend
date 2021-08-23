import React from "react";
import { Button, CloseIcon } from "./styles";

interface IButtonDisapprove {
  onClick?: () => void;
}

const ButtonDisapprove: React.FC<IButtonDisapprove> = ({ onClick }) => {
  return (
    <Button onClick={onClick}>
      <CloseIcon />
    </Button>
  );
};

export default ButtonDisapprove;
