import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import { TableContainer } from "./styles";

interface IData {
  id: string;
  name: string;
  value: number;
  quantity: number;
  unitOfMeasure: string;
  costCenter: string;
}

interface IColumns {
  name: string;
  align?: "left" | "right";
}

interface IMyTableExcel {
  style?: React.CSSProperties;
  columns: Array<IColumns>;
}

const MyTableExcel: React.FC<IMyTableExcel> = ({
  columns,
  children,
  style,
}) => {
  return (
    <TableContainer component={Paper} style={style}>
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            {columns.map((item) => (
              <TableCell align={item.align ? item.align : "left"}>
                <p style={{ fontWeight: 600, fontSize: 15 }}>{item.name}</p>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>{children}</TableBody>
      </Table>
    </TableContainer>
  );
};

export default MyTableExcel;
