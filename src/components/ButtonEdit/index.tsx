import React from "react";
import { Button, EditIcon } from "./styles";

interface IButtonEdit {
  onClick?: () => void;
}

const ButtonEdit: React.FC<IButtonEdit> = ({ onClick }) => {
  return (
    <Button onClick={onClick}>
      <EditIcon />
    </Button>
  );
};

export default ButtonEdit;
