import styled from "styled-components";

import Table from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";

export const TableContainer = styled(Table).attrs((props) => ({
  component: Paper,
}))`
  width: auto;
  min-width: 80%;
  max-width: 110%;
  margin-top: 30px;
  border-radius: 0px !important;
  margin-bottom: 20px !important;
  & th,
  td {
    border: 2px solid #c3cfd9;
  }
`;
