import React, { FormEvent, useState } from "react";

import CardForm from "../../components/CardForm";
import AvatarImage from "../../assets/user.png";

import {
  InputBlock,
  UploadContainer,
  UploadImage,
  PreviewImage,
  UploadText,
  Input,
} from "./styles";

const Register: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [, setAvatar] = useState<File | string>("");
  const [avatarUrl, setAvatarUrl] = useState(AvatarImage);

  const handleChange = (files: FileList | null) => {
    if (files) {
      setAvatar(files[0]);
      setAvatarUrl(URL.createObjectURL(files[0]));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log("submit");
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
          <UploadImage htmlFor="upload" />
          <PreviewImage src={avatarUrl} />
        </UploadContainer>
        <UploadText>Clique para alterar seu avatar</UploadText>
        <input
          id="upload"
          type="file"
          onChange={(e) => handleChange(e.target.files)}
          style={{ opacity: 0 }}
        />

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
