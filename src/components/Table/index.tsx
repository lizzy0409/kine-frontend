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

interface IUser {
  id: string;
  name: string;
  email: string;
  platformAccess: string;
}

interface IMyTable {
  users: IUser[];
}

const MyTable: React.FC<IMyTable> = ({ users }) => {
  function approveUser(id: string) {
    console.log(`approveUser: ${id}`);
  }
  function disapproveUser(id: string) {
    console.log(`disapproveUser: ${id}`);
  }
  return (
    <TableContainer component={Paper} style={{ marginTop: 30 }}>
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
              <p style={{ fontWeight: 600, fontSize: 15 }}>
                Acesso á Plataforma
              </p>
            </TableCell>
            <TableCell align="right">
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
              <TableCell width="400px" align="left">
                {user.platformAccess}
              </TableCell>
              <TableCell align="right" style={{ display: "flex" }}>
                <ButtonDisapprove onClick={() => disapproveUser(user.id)} />
                <ButtonApprove onClick={() => approveUser(user.id)} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MyTable;
