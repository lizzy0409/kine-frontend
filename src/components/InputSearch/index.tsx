/* eslint-disable no-use-before-define */
import React, { InputHTMLAttributes } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";
import Input from "../Input";

import { InputStyled } from "./styles";

const filter = createFilterOptions<Teste>();

interface Teste {
  inputValue?: string;
  name: string;
}

interface InputSeach extends InputHTMLAttributes<HTMLInputElement> {
  data: Teste[];
  inputSearchValue: Teste | null;
  setValue: React.Dispatch<React.SetStateAction<Teste | null>>;
  noAddOption?: boolean;
  disabled?: boolean;
}

const InputSearch: React.FC<InputSeach> = ({
  placeholder,
  data,
  inputSearchValue,
  setValue,
  noAddOption,
  disabled,
  ...rest
}) => {
  if (noAddOption) {
    return (
      <Autocomplete
        id="combo-box-demo"
        value={inputSearchValue}
        onChange={(event, newValue) => {
          if (typeof newValue === "string") {
            setValue({
              name: newValue,
            });
          } else if (newValue && newValue.inputValue) {
            // Create a new value from the user input
            setValue({
              name: newValue.inputValue,
            });
          } else {
            setValue(newValue);
          }
        }}
        disabled={disabled}
        options={data}
        getOptionLabel={(option) => option.name}
        renderInput={(params) => (
          <div ref={params.InputProps.ref}>
            <InputStyled
              required
              type="text"
              {...params.inputProps}
              placeholder={placeholder}
            />
          </div>
        )}
      />
    );
  }
  return (
    <Autocomplete
      value={inputSearchValue}
      onChange={(event, newValue) => {
        if (typeof newValue === "string") {
          setValue({
            name: newValue,
          });
        } else if (newValue && newValue.inputValue) {
          // Create a new value from the user input
          setValue({
            name: newValue.inputValue,
          });
        } else {
          setValue(newValue);
        }
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        // Suggest the creation of a new value
        if (params.inputValue !== "") {
          filtered.push({
            inputValue: params.inputValue,
            name: `Add "${params.inputValue}"`,
          });
        }

        return filtered;
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      id="free-solo-with-text-demo"
      options={data}
      getOptionLabel={(option) => {
        // Value selected with enter, right from the input
        if (typeof option === "string") {
          return option;
        }
        // Add "xxx" option created dynamically
        if (option.inputValue) {
          return option.inputValue;
        }
        // Regular option
        return option.name;
      }}
      renderOption={(option) => option.name}
      freeSolo
      disabled={disabled}
      //renderInput={(params) => <TextField {...params} variant="outlined" />}
      renderInput={(params) => (
        <div ref={params.InputProps.ref}>
          <InputStyled
            required
            type="text"
            {...params.inputProps}
            placeholder={placeholder}
          />
        </div>
      )}
    />
  );
};

export default InputSearch;
