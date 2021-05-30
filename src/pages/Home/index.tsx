import React, { useState } from "react";
import Card from "../../components/Card";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

import { Wrapper, Container } from "./styles";

const Home: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <Sidebar open={menuOpen} setOpen={setMenuOpen} />
      <Header setOpen={setMenuOpen} />
      <Wrapper>
        <Container>
          <Card
            title="Nova OS"
            text="Registrar uma nova ordem de serviço"
            icon="i"
          />
          <Card
            title="Nova Compra"
            text="Registrar a entrada de itens no almoxarifado"
            icon="i"
          />
          <Card
            title="Saida do Estoque"
            text="Registrar a saída de itens do almoxarifado, para uma obra"
            icon="i"
          />
          <Card
            title="Retorno ao Estoque"
            text="Registrar o retorno dos itens que tinham ido para uma obra"
            icon="i"
          />
          <Card title="Estoque" text="Visualizar o estoque completo" icon="i" />
          <Card
            title="Gerenciar OS's"
            text="Visualizar todas as OS do sistema"
            icon="i"
          />
        </Container>
      </Wrapper>
    </>
  );
};

export default Home;
