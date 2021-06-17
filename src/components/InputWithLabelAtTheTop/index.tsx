import React, { InputHTMLAttributes } from "react";

import { InputContainer, Label, InputStyled } from "./styles";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const InputWithLabelAtTheTop: React.FC<InputProps> = ({ label, ...rest }) => {
  return (
    <InputContainer>
      <Label>{label}</Label>
      <InputStyled required {...rest} />
    </InputContainer>
  );
};

export default InputWithLabelAtTheTop;
