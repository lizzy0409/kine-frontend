import React from "react";
import { Button, TrashIcon } from "./styles";

interface IButtonRemoveUser {
  onClick?: () => void;
}

const ButtonRemoveUser: React.FC<IButtonRemoveUser> = ({ onClick }) => {
  return (
    <Button onClick={onClick}>
      <TrashIcon />
    </Button>
  );
};

export default ButtonRemoveUser;
