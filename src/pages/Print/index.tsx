import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

import InputWithLabelAtTheTop from "../../components/InputWithLabelAtTheTop";

import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

import {
  Container,
  InputLine,
  ItemsPurchasedContainer,
  TitleProducts,
  Divisor,
  Text,
} from "./styles";
import formatDate from "../../utils/formatDate";
import api from "../../services/api";
import MyTableExcel from "../../components/ExcelTable";

interface ParamsProps {
  id: string;
}

interface ProductProps {
  id: string;
  name: string;
  value: number;
  quantity: number;
  unitOfMeasure: string;
  costCenter: string;
}

interface Teste {
  inputValue?: string;
  name: string;
}

const Print = () => {
  const { id } = useParams<ParamsProps>();

  const [products, setProducts] = useState<ProductProps[]>([]);

  const [client, setClient] = useState<Teste | null>(null);

  const [seller, setSeller] = useState<Teste | null>(null);

  const [responsibleTechnician, setResponsibleTechnician] =
    useState<Teste | null>(null);

  const [visible, setVisible] = useState(false);
  const [SONumber, setSONumber] = useState<string>("");
  const [manpower, setManpower] = useState(0);
  const [displacement, setDisplacement] = useState(0);
  const [openingDate, setOpeningDate] = useState<Date>(new Date());
  const [closingDate, setClosingDate] = useState<Date>(new Date());

  async function openOsDetails() {
    try {
      const { data } = await api.get(`/so/${id}`);
      setProducts(data.materials);
      setOpeningDate(data.openingDate);
      setClosingDate(data.closingDate);
      setSONumber(data.SONumber);
      setClient({ name: data.client });
      setResponsibleTechnician({ name: data.responsibleTechnician });
      setSeller({ name: data.seller });
      setManpower(data.manpower);
      setDisplacement(data.displacement);
      setVisible(true);
      window.print();
    } catch (error) {
      console.log(error);
      setVisible(false);
    }
  }

  useEffect(() => {
    openOsDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container style={{ opacity: visible ? 1 : 0 }}>
      <div>
        <InputLine>
          <InputWithLabelAtTheTop
            label="Data da abertura:"
            disabled={true}
            value={formatDate(openingDate)}
          />
          <InputWithLabelAtTheTop
            label="Data do fechamento:"
            disabled={true}
            value={formatDate(closingDate)}
          />
        </InputLine>
        <InputLine>
          <InputWithLabelAtTheTop
            label="Número da OS"
            disabled={true}
            value={SONumber}
          />
          <InputWithLabelAtTheTop
            label="Cliente"
            disabled={true}
            value={client?.name}
          />
        </InputLine>
        <InputLine>
          <InputWithLabelAtTheTop
            label="Técnico"
            disabled={true}
            value={responsibleTechnician?.name}
          />
          <InputWithLabelAtTheTop
            label="Vendedor"
            disabled={true}
            value={seller?.name}
          />
        </InputLine>
        <InputLine>
          <InputWithLabelAtTheTop
            label="Mão de Obra"
            disabled={true}
            value={manpower}
          />
          <InputWithLabelAtTheTop
            label="Deslocamento"
            disabled={true}
            value={displacement}
          />
        </InputLine>
        <ItemsPurchasedContainer>
          <Divisor />
          <TitleProducts>Materiais Utilizados</TitleProducts>
          {products.length ? (
            <MyTableExcel
              columns={[
                { name: "Nome do Produto" },
                { name: "Valor Unitário" },
                { name: "Quantidade" },
                { name: "Valor Total" },
              ]}
            >
              {products.map((item) => (
                <TableRow key={item.id}>
                  <TableCell component="th" scope="row">
                    {item.name}
                  </TableCell>
                  <TableCell align="left">R$ {item.value}</TableCell>
                  <TableCell align="left">{item.quantity}</TableCell>
                  <TableCell align="left">
                    R$ {item.quantity * item.value}
                  </TableCell>
                </TableRow>
              ))}
            </MyTableExcel>
          ) : (
            <Text>Nenhum material foi alocado a essa OS</Text>
          )}
        </ItemsPurchasedContainer>
      </div>
    </Container>
  );
};

export default Print;
