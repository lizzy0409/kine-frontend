import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import ButtonApprove from "../ButtonApprove";
import ButtonDisapprove from "../ButtonDisapprove";
import ButtonRemoveUser from "../ButtonRemoveUser";
import api from "../../services/api";

interface IUser {
  id: string;
  name: string;
  email: string;
  allow_access: boolean;
  status: "APROVADO" | "toEvaluate" | "REPROVADO" | "DELETADO";
}

interface IMyTable {
  users: IUser[];
  setUsersAwaitingApproval: React.Dispatch<React.SetStateAction<IUser[]>>;
  setRegisteredUsers: React.Dispatch<React.SetStateAction<IUser[]>>;
  usersTableAwaitingApproval?: boolean;
}

const MyTable: React.FC<IMyTable> = ({
  users,
  setUsersAwaitingApproval,
  setRegisteredUsers,
  usersTableAwaitingApproval,
}) => {
  async function approveUser(id: string) {
    api.patch(`/users/${id}`, { allow_access: true });

    setUsersAwaitingApproval((data) =>
      data.filter((user: IUser) => {
        return user.id !== id;
      })
    );

    const { data } = await api.get(`users/${id}`);
    const user: IUser = data;
    user.allow_access = true;
    setRegisteredUsers((data) => [...data, user]);
  }

  async function disapproveUser(id: string) {
    await api.patch(`/users/${id}`, {
      allow_access: false,
      disapproved: true,
    });

    setUsersAwaitingApproval((data) =>
      data.filter((user: IUser) => {
        return user.id !== id;
      })
    );
  }
  async function RemoveUser(id: string) {
    if (!usersTableAwaitingApproval) {
      try {
        await api.delete(`/users/${id}`);

        setRegisteredUsers((data) =>
          data.filter((user: IUser) => {
            return user.id !== id;
          })
        );
      } catch (error) {
        console.log(error);
      }
    }
  }
  return (
    <TableContainer component={Paper} style={{ marginTop: 30 }}>
      {console.log(users)}
      <Table style={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>
              <p style={{ fontWeight: 600, fontSize: 15 }}>Nome</p>
            </TableCell>
            <TableCell align="left">
              <p style={{ fontWeight: 600, fontSize: 15 }}>Email</p>
            </TableCell>
            <TableCell width="200px" align="left">
              <p style={{ fontWeight: 600, fontSize: 15 }}>Status</p>
            </TableCell>
            <TableCell width="200px" align="right">
              <p style={{ fontWeight: 600, fontSize: 15 }}>Ações</p>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell component="th" scope="row">
                {user.name}
              </TableCell>
              <TableCell align="left">{user.email}</TableCell>
              <TableCell width="300px" align="left">
                {user.allow_access ? "Aprovado" : "Aguardadando aprovação"}
              </TableCell>
              <TableCell
                width="200px"
                align="right"
                style={{ display: "flex" }}
              >
                {usersTableAwaitingApproval ? (
                  <>
                    <ButtonDisapprove onClick={() => disapproveUser(user.id)} />
                    <ButtonApprove onClick={() => approveUser(user.id)} />
                  </>
                ) : (
                  <ButtonRemoveUser
                    onClick={() => {
                      RemoveUser(user.id);
                    }}
                  />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MyTable;
