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
}

const Input: React.FC<InputProps> = ({
  label,
  inputSearch,
  data,
  inputSearchValue,
  setValue,
  noAddOption,
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
          {...rest}
        />
      ) : (
        <InputStyled required {...rest} />
      )}
    </InputContainer>
  );
};

export default Input;
