import React from "react";
import { Button, CheckIcon } from "./styles";

interface IButtonApprove {
  onClick?: () => void;
}

const ButtonApprove: React.FC<IButtonApprove> = ({ onClick }) => {
  return (
    <Button onClick={onClick}>
      <CheckIcon />
    </Button>
  );
};

export default ButtonApprove;
