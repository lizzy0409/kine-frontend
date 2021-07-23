import React, { useContext, useEffect, useState } from "react";
import Header from "../../components/Header";
import Table from "../../components/Table";
import { SideBarContext } from "../../contexts/SideBarContext";
import api from "../../services/api";

import { Container, Section, Title } from "./styles";

interface IUser {
  id: string;
  name: string;
  email: string;
  awaitingApproval: boolean;
  disapproved: boolean;
}

const ManageUsers: React.FC = () => {
  const { open } = useContext(SideBarContext);

  const [usersAwaitingApproval, setUsersAwaitingApproval] = useState<IUser[]>(
    []
  );
  const [registeredUsers, setRegisteredUsers] = useState<IUser[]>([]);

  async function getUsers() {
    try {
      const { data } = await api.get("/users");

      let usersAwaitingApprovalTemp: IUser[] = [];
      let registeredUsersTemp: IUser[] = [];

      data.forEach((user: IUser) => {
        if (!user.disapproved) {
          if (user.awaitingApproval) {
            usersAwaitingApprovalTemp.push(user);
          } else {
            registeredUsersTemp.push(user);
          }
        }
      });
      setUsersAwaitingApproval(usersAwaitingApprovalTemp);
      setRegisteredUsers(registeredUsersTemp);
    } catch (error) {}
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <Header pageName="Gerenciar Usuários" />

      <Container open={open}>
        <Section>
          <Title>Usuários aguardando aprovação:</Title>
          <Table
            users={usersAwaitingApproval}
            setUsersAwaitingApproval={setUsersAwaitingApproval}
            setRegisteredUsers={setRegisteredUsers}
            usersTableAwaitingApproval
          />
        </Section>

        <Section>
          <Title>Usuários Cadastrados:</Title>
          <Table
            users={registeredUsers}
            setUsersAwaitingApproval={setUsersAwaitingApproval}
            setRegisteredUsers={setRegisteredUsers}
          />
        </Section>
      </Container>
    </>
  );
};

export default ManageUsers;
