import React, { FormEvent, useState } from "react";

import CardForm from "../../components/CardForm";
import api from "../../services/api";

import { useHistory } from "react-router-dom";

import { InputBlock, Input } from "./styles";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const Login: React.FC = () => {
  const history = useHistory();

  const { handleLogin } = useContext(AuthContext);

  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    handleLogin({ email, password }).then((authorized) => {
      if (authorized) {
        history.push("/");
      }
    });
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
          type="email"
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
