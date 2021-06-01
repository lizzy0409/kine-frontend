import React, { useState } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import Table from "../../components/Table";

import { Container, Section, Title } from "./styles";

interface IUser {
  id: string;
  name: string;
  email: string;
  platformAccess: string;
}

const ManageUsers: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [users, setUsers] = useState<IUser[]>([
    {
      id: "1",
      name: "Nome do Vendedor",
      email: "email@vendedor.com",
      platformAccess: "Aguardando Aprovação",
    },

    {
      id: "1",
      name: "Nome do Vendedor2",
      email: "email@vendedor2.com",
      platformAccess: "Aguardando Aprovação",
    },
  ]);

  return (
    <>
      <Header pageName="Gerenciar Usuários" setOpen={setMenuOpen} />
      <Sidebar open={menuOpen} setOpen={setMenuOpen} />

      <Container>
        <Section>
          <Title>Usuários aguardando aprovação:</Title>
          <Table users={users} />
        </Section>

        <Section>
          <Title>Usuários Cadastrados:</Title>
          <Table users={users} />
        </Section>
      </Container>
    </>
  );
};

export default ManageUsers;
