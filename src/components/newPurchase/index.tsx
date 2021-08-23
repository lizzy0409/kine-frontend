import Modal from "../Modal";
import React, { FormEvent, useEffect, useState } from "react";
import Button from "../Button";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

import Input from "../Input";

import {
  Container,
  ItemsPurchasedContainer,
  Divisor,
  Title,
  Text,
  PlusIcon,
  ButtonsContainer,
} from "./styles";
import MyTableExcel from "../ExcelTable";
import api from "../../services/api";
import randomId from "../../utils/randomId";
import ButtonEdit from "../ButtonEdit";
import ButtonRemoveProduct from "../ButtonRemoveProduct";
interface Teste {
  inputValue?: string;
  name: string;
}

interface ProductProps {
  id: string;
  name: string;
  value: number | string;
  quantity: number;
  unitOfMeasure: string;
  costCenter: string;
}

interface NewPurchaseProps {
  changeValue: (value: number) => void;
  preData?: ProductProps;
}

const NewPurchase: React.FC<NewPurchaseProps> = ({ changeValue, preData }) => {
  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [products, setProducts] = useState<ProductProps[]>(
    preData ? [preData] : []
  );

  const [supplier, setSupplier] = useState<Teste | null>(null);
  const [suppliers, setSuppliers] = useState<Teste[]>([]);

  const [name, setName] = useState<Teste | null>(null);
  const [names, setNames] = useState<Teste[]>([]);

  const [unitOfMeasure, setUnitOfMeasure] = useState<Teste | null>(null);
  const [unitOfMeasures, setUnitOfMeasures] = useState<Teste[]>([]);

  const [costCenter, setCostCenter] = useState<Teste | null>(null);
  const [costCenters, setCostCenters] = useState<Teste[]>([]);

  const [id, setId] = useState("");
  const [totalPurchaseAmount, setTotalPurchaseAmount] = useState<
    number | string
  >("");
  const [value, setValue] = useState<number | string>("");
  const [quantity, setQuantity] = useState<number>(0);

  const [costCenterDisabled, setCostCenterDisabled] = useState(false);

  function clearStates() {
    setId("");
    setName(null);
    setValue("");
    setQuantity(0);
    setUnitOfMeasure(null);
    setCostCenter(null);
    setCostCenterDisabled(false);
  }

  function addProduct(product: ProductProps) {
    setId(product.id);
    setProducts([...products, product]);
  }
  function removeProduct(product: ProductProps) {
    setProducts((data) => data.filter((item) => item !== product));
  }
  function editProduct(product: ProductProps) {
    setProducts((data) =>
      data.map((item) => {
        setQuantity(product.quantity);

        if (item.id === product.id) {
          return {
            id: product.id,
            name: product.name,
            value: product.value,
            quantity: product.quantity,
            unitOfMeasure: item.unitOfMeasure,
            costCenter: item.costCenter,
          };
        }
        return item;
      })
    );
  }
  function OpenEditModal(product: ProductProps) {
    setOpenEditModal(true);
    setId(product.id);
    setName({ name: product.name });
    setValue(product.value);
    setQuantity(product.quantity);
  }

  function handleAddSubmit(e: FormEvent) {
    e.preventDefault();
    const product: ProductProps = {
      id: randomId(),
      name: name?.name || "",
      value,
      quantity,
      unitOfMeasure: unitOfMeasure?.name || "",
      costCenter: costCenter?.name || "",
    };
    addProduct(product);
    setOpenModal(false);
  }

  function handleEditSubmit(e: FormEvent) {
    e.preventDefault();
    const product: ProductProps = {
      id: id,
      name: name?.name || "",
      value,
      quantity,
      unitOfMeasure: unitOfMeasure?.name || "",
      costCenter: costCenter?.name || "",
    };
    editProduct(product);
    setOpenEditModal(false);
  }

  async function handlePurchaseSubmit(e: FormEvent) {
    e.preventDefault();

    try {
      products.forEach((product) => {
        api.post("/products", {
          ...product,
          stockLimit: product.quantity,
          id: null,
        });
      });
      api.post("/purchases", {
        supplier: supplier?.name,
        totalPurchaseAmount,
        products,
      });

      api.post("/suppliers", { name: supplier?.name });

      products.forEach((product) => {
        api.post("/materials", { name: product.name });
        api.post("/costCenters", { name: product.costCenter });
        api.post("/unitOfMeasures", { name: product.unitOfMeasure });
      });

      alert("Compra feita com sucesso!");
      changeValue(0);
    } catch (error) {
      console.log(error);
    }
  }

  function handleCancel() {
    setSupplier(null);
    setTotalPurchaseAmount("");
    setProducts([]);
  }

  async function getInputSearchResults() {
    try {
      const { data: suppliers } = await api.get("/suppliers");
      setSuppliers(suppliers);

      const { data } = await api.get<ProductProps[]>("/products");

      let parsedData: Teste[] = [];

      /*const { data: materials } = await api.get("/materials");
      setNames(materials);*/

      data.forEach((product) => {
        parsedData.push({ name: product.name });
      });
      setNames(parsedData);

      const { data: unitOfMeasures } = await api.get("/unitOfMeasures");
      setUnitOfMeasures(unitOfMeasures);

      const { data: costCenters } = await api.get("/costCenters");
      setCostCenters(costCenters);
    } catch (error) {
      console.log(error);
    }
  }

  const getProductDetails = async () => {
    const { data } = await api.get(`/products?name=${name?.name}`);

    if (data.length) {
      setCostCenterDisabled(true);
      setCostCenter({ name: data[0].costCenter });
      setUnitOfMeasure({ name: data[0].unitOfMeasure });
    } else {
      setCostCenterDisabled(false);
      setCostCenter({ name: "" });
      setUnitOfMeasure({ name: "" });
    }
  };

  useEffect(() => {
    if (!openModal) {
      clearStates();
    }
  }, [openModal]);

  useEffect(() => {
    getInputSearchResults();
  }, []);

  useEffect(() => {
    getProductDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);

  return (
    <>
      {openEditModal && (
        <Modal
          title="Editar Produto"
          handleSubmit={handleEditSubmit}
          setOpenModal={setOpenEditModal}
        >
          <div>
            <Input
              inputSearch
              data={names}
              label="Nome do Produto"
              placeholder="Insira o nome do Produto"
              inputSearchValue={name}
              setValue={setName}
            />
            <Input
              label="Valor Unitário"
              placeholder="Insira o Valor do Item"
              onBlur={() => {
                setValue(Number(value).toFixed(2));
              }}
              type={"number"}
              min="0"
              step=".01"
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
              }}
            />
            <Input
              label="Quantidade"
              placeholder="Insira a Quantidade Comprada"
              type={"number"}
              min="0"
              value={quantity === 0 ? "" : quantity}
              onChange={(e) => {
                setQuantity(Number(e.target.value));
              }}
            />
          </div>
          <>
            <Button
              type="button"
              outline
              color="#6558F5"
              onClick={() => {
                setOpenModal(false);
              }}
            >
              Cancelar
            </Button>
            <Button type="submit" style={{ width: 160 }} color="#1AAE9F">
              Salvar alterações
            </Button>
          </>
        </Modal>
      )}
      {openModal && (
        <Modal
          title="Cadastrar Produto"
          handleSubmit={handleAddSubmit}
          setOpenModal={setOpenModal}
        >
          <div>
            <Input
              inputSearch
              data={names}
              label="Nome do Produto"
              placeholder="Insira o nome do Produto"
              inputSearchValue={name}
              setValue={setName}
            />
            <Input
              label="Valor Unitário"
              placeholder="Insira o Valor do Item"
              onBlur={() => {
                setValue(Number(value).toFixed(2));
              }}
              type={"number"}
              min="0.01"
              step=".01"
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
              }}
            />
            <Input
              label="Quantidade"
              placeholder="Insira a Quantidade Comprada"
              type={"number"}
              min="0"
              value={quantity === 0 ? "" : quantity}
              onChange={(e) => {
                setQuantity(Number(e.target.value));
              }}
            />
            <Input
              inputSearch
              data={unitOfMeasures}
              label="Unidade de Medida"
              placeholder="Selecione a quantidade"
              inputSearchValue={unitOfMeasure}
              setValue={setUnitOfMeasure}
              disabled={costCenterDisabled}
            />
            <Input
              inputSearch
              data={costCenters}
              label="Centro de Custo"
              placeholder="Selecione a Categoria do Produto"
              inputSearchValue={costCenter}
              setValue={setCostCenter}
              disabled={costCenterDisabled}
            />
          </div>
          <>
            <Button
              type="button"
              outline
              color="#6558F5"
              onClick={() => {
                setOpenModal(false);
              }}
            >
              Cancelar
            </Button>
            <Button type="submit" style={{ width: 160 }} color="#1AAE9F">
              Adicionar Produto
            </Button>
          </>
        </Modal>
      )}
      <Container onSubmit={handlePurchaseSubmit}>
        <div>
          <Input
            inputSearch
            data={suppliers}
            label="Fornecedor"
            placeholder="Informe o Fornecedor"
            inputSearchValue={supplier}
            setValue={setSupplier}
          />
          <Input
            label="Valor Total da Compra"
            placeholder="Informe o valor total da compra"
            onBlur={() => {
              setTotalPurchaseAmount(Number(totalPurchaseAmount).toFixed(2));
            }}
            type="number"
            min="0.01"
            step=".01"
            value={totalPurchaseAmount}
            onChange={(e) => {
              setTotalPurchaseAmount(e.target.value);
            }}
          />
        </div>
        <ItemsPurchasedContainer>
          <Divisor />
          <Title>Itens adquiridos</Title>
          {products.length ? (
            <MyTableExcel
              columns={[
                { name: "Nome do Produto" },
                { name: "Valor Unitário" },
                { name: "Quantidade" },
                { name: "Valor Total" },
                { name: "Ações", align: "right" },
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
                    R$ {item.quantity * Number(item.value)}
                  </TableCell>
                  <TableCell align="right">
                    <ButtonEdit onClick={() => OpenEditModal(item)} />
                    <ButtonRemoveProduct onClick={() => removeProduct(item)} />
                  </TableCell>
                </TableRow>
              ))}
            </MyTableExcel>
          ) : (
            <Text>Sem itens alocados a essa OS</Text>
          )}
          <Button
            outline
            type="button"
            color="#6558F5"
            onClick={() => {
              setOpenModal(true);
            }}
          >
            <PlusIcon /> Adicionar Produtos ao Estoque
          </Button>
        </ItemsPurchasedContainer>
        <ButtonsContainer>
          <Button onClick={handleCancel} type="button" outline color="#6558F5">
            Cancelar
          </Button>
          <Button style={{ padding: "0 35px" }} color="#1AAE9F">
            Salvar
          </Button>
        </ButtonsContainer>
      </Container>
    </>
  );
};

export default NewPurchase;
