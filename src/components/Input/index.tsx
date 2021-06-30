import React, { InputHTMLAttributes } from "react";
import InputSearch from "../InputSearch";

import { InputContainer, Label, InputStyled } from "./styles";

interface Teste {
  inputValue?: string;
  name: string;
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  inputSearch?: boolean;
  data?: Teste[];
  noAddOption?: boolean;
  inputSearchValue?: Teste | null;
  setValue?: React.Dispatch<React.SetStateAction<Teste | null>>;
  disabled?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  inputSearch,
  data,
  inputSearchValue,
  setValue,
  noAddOption,
  disabled,
  ...rest
}) => {
  return (
    <InputContainer
      onBlur={() => {
        console.log("oi");
      }}
    >
      <Label>{label}</Label>
      {inputSearch ? (
        <InputSearch
          inputSearchValue={inputSearchValue!}
          setValue={setValue!}
          data={data!}
          noAddOption={noAddOption}
          disabled={disabled}
          {...rest}
        />
      ) : (
        <InputStyled required {...rest} />
      )}
    </InputContainer>
  );
};

export default Input;
