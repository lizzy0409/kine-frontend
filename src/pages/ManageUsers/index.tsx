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
  allow_access: boolean;
  status: "APROVADO" | "toEvaluate" | "REPROVADO" | "DELETADO";
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
      let disapprovedUsersTemp: IUser[] = [];
      let deletedUsersTemp: IUser[] = [];

      data.forEach((user: IUser) => {
        console.log(user.allow_access);
        if (user.allow_access) {
          console.log("Entrou?");
          if (user.status === "APROVADO") {
            registeredUsersTemp.push(user);
          }
        } else {
          if (user.status === "toEvaluate") {
            usersAwaitingApprovalTemp.push(user);
          }
          if (user.status === "REPROVADO") {
            usersAwaitingApprovalTemp.push(user);
          }
          if (user.status === "DELETADO") {
            usersAwaitingApprovalTemp.push(user);
          }
        }
      });
      console.log("\nwaiting:", usersAwaitingApprovalTemp);
      console.log("\nregis:", registeredUsersTemp);
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
          <Title>Usuários Aprovados:</Title>
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
