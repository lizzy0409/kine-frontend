import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import { TableContainer } from "./styles";
import ButtonEdit from "../ButtonEdit";
import ButtonRemoveProduct from "../ButtonRemoveProduct";

interface IData {
  id: string;
  name: string;
  value: number;
  quantity: number;
  unitOfMeasure: string;
  costCenter: string;
}

interface IMyTableExcel {
  data: IData[];
  removeProduct: (product: IData) => void;
  OpenEditModal: (product: IData) => void;
}

const MyTableExcel: React.FC<IMyTableExcel> = ({
  data,
  removeProduct,
  OpenEditModal,
}) => {
  return (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>
              <p style={{ fontWeight: 600, fontSize: 15 }}>Nome do Produto</p>
            </TableCell>
            <TableCell align="left">
              <p style={{ fontWeight: 600, fontSize: 15 }}>Valor Unitário</p>
            </TableCell>
            <TableCell align="left">
              <p style={{ fontWeight: 600, fontSize: 15 }}>Quantidade</p>
            </TableCell>
            <TableCell align="left">
              <p style={{ fontWeight: 600, fontSize: 15 }}>Valor total</p>
            </TableCell>
            <TableCell align="right">
              <p style={{ fontWeight: 600, fontSize: 15 }}>Ações</p>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell component="th" scope="row">
                {item.name}
              </TableCell>
              <TableCell align="left">R$ {item.value}</TableCell>
              <TableCell align="left">{item.quantity}</TableCell>
              <TableCell align="left">
                R$ {item.quantity * item.value}
              </TableCell>
              <TableCell align="right">
                <ButtonEdit onClick={() => OpenEditModal(item)} />
                <ButtonRemoveProduct onClick={() => removeProduct(item)} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MyTableExcel;
