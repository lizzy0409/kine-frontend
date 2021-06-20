import React, { FormEvent, useState } from "react";

import CardForm from "../../components/CardForm";
import AvatarImage from "../../assets/user.png";

import { useHistory } from "react-router-dom";

import {
  InputBlock,
  UploadContainer,
  UploadImage,
  PreviewImage,
  UploadText,
  Input,
} from "./styles";
import api from "../../services/api";

const Register: React.FC = () => {
  const history = useHistory();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [avatar, setAvatar] = useState<File | string>("");
  const [avatarUrl, setAvatarUrl] = useState(AvatarImage);

  const handleChange = (files: FileList | null) => {
    if (files) {
      setAvatar(files[0]);
      setAvatarUrl(URL.createObjectURL(files[0]));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const { data } = await api.post("/users", {
      name,
      email,
      password,
      avatarUrl,
      awaitingApproval: true,
    });
    localStorage.setItem("@kine:id", data.id);

    history.push("/");
  };

  return (
    <CardForm
      title="Criar conta"
      subtitle="Você já tem uma conta?"
      subtitleLink="Entrar"
      subtitleLinkHref="/entrar"
      buttonTitle="Registrar"
      onSubmit={handleSubmit}
    >
      <InputBlock>
        <UploadContainer>
          <UploadImage
            type="file"
            style={{ opacity: 0 }}
            onChange={(e) => {
              handleChange(e.target.files);
            }}
          />
          <PreviewImage src={avatarUrl} />
        </UploadContainer>
        <UploadText>Clique para alterar seu avatar</UploadText>

        <Input
          required
          autoCapitalize="words"
          placeholder="Nome"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />

        <Input
          required
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <Input
          required
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </InputBlock>
    </CardForm>
  );
};

export default Register;
