import React from "react";

import { InputContainer, Label, InputStyled } from "./styles";

interface InputProps {
  label: string;
  placeholder: string;
}

const Input: React.FC<InputProps> = ({ label, placeholder }) => {
  return (
    <InputContainer>
      <Label>{label}</Label>
      <InputStyled placeholder={placeholder} />
    </InputContainer>
  );
};

export default Input;
