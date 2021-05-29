import React, { FormEvent, useState } from "react";

import CardForm from "../../components/CardForm";

import { InputBlock, Input } from "./styles";

const Login: React.FC = () => {
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log("submit");
  };
  return (
    <CardForm
      title="Entrar"
      subtitle="Você não tem uma conta?"
      subtitleLink="Cadastre-se"
      subtitleLinkHref="/cadastrar"
      buttonTitle="Entrar"
      onSubmit={handleSubmit}
    >
      <InputBlock>
        <Input
          required
          placeholder="Email"
          value={email}
          onChange={(e) => {
            SetEmail(e.target.value);
          }}
        />
        <Input
          required
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => {
            SetPassword(e.target.value);
          }}
        />
      </InputBlock>
    </CardForm>
  );
};

export default Login;
