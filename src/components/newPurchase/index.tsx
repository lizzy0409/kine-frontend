import Modal from "../Modal";
import React, { FormEvent, useEffect, useState } from "react";
import Button from "../Button";

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
import MyTableExcel from "../ExcelTabel";
import api from "../../services/api";
import randomId from "../../utils/randomId";

interface ProductProps {
  id: string;
  name: string;
  value: number;
  quantity: number;
  unitOfMeasure: string;
  costCenter: string;
}

interface IApi extends ProductProps {
  stockLimit: number;
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

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [value, setValue] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0);
  const [unitOfMeasure, setUnitOfMeasure] = useState("");
  const [costCenter, setCostCenter] = useState("");

  function clearStates() {
    setId("");
    setName("");
    setValue(0);
    setQuantity(0);
    setUnitOfMeasure("");
    setCostCenter("");
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
    setName(product.name);
    setValue(product.value);
    setQuantity(product.quantity);
  }

  function handleAddSubmit(e: FormEvent) {
    e.preventDefault();
    const product: ProductProps = {
      id: randomId(),
      name,
      value,
      quantity,
      unitOfMeasure,
      costCenter,
    };
    addProduct(product);
    setOpenModal(false);
  }

  function handleEditSubmit(e: FormEvent) {
    e.preventDefault();
    const product: ProductProps = {
      id: id,
      name,
      value,
      quantity,
      unitOfMeasure,
      costCenter,
    };
    editProduct(product);
    setOpenEditModal(false);
  }

  async function handlePurchaseSubmit(e: FormEvent) {
    e.preventDefault();

    try {
      const { data } = await api.get<IApi[]>("/products");

      products.forEach((product) => {
        if (data.length) {
          data.forEach((item) => {
            if (item.id === product.id || item.name === product.name) {
              let stockLimit;
              if (item.quantity + product.quantity > item.stockLimit) {
                stockLimit = item.quantity + product.quantity;
              } else {
                stockLimit = item.stockLimit;
              }
              api.patch(`/products/${item.id}`, {
                name: product.name,
                value: product.value,
                quantity: item.quantity + product.quantity,
                unitOfMeasure: product.unitOfMeasure,
                costCenter: product.costCenter,
                stockLimit,
              });
            } else {
              api.post("/products", {
                ...product,
                stockLimit: product.quantity,
                id: null,
              });
            }
          });
        } else {
          api.post("/products", {
            ...product,
            stockLimit: product.quantity,
            id: null,
          });
        }
      });
      changeValue(0);
    } catch (error) {
      console.log(error);
    }
  }

  function handleCancel() {}

  useEffect(() => {
    if (!openModal) {
      clearStates();
    }
  }, [openModal]);

  return (
    <Container>
      {openModal && (
        <Modal
          title="Cadastrar Produto"
          handleSubmit={handleAddSubmit}
          setOpenModal={setOpenModal}
        >
          <div>
            <Input
              label="Nome do Produto"
              placeholder="Insira o nome do Produto"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <Input
              label="Valor Unitário"
              placeholder="Insira o Valor do Item"
              type={"number"}
              min="0"
              value={value === 0 ? "" : value}
              onChange={(e) => {
                setValue(Number(e.target.value));
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
              label="Unidade de Medida"
              placeholder="Selecione a quantidade"
              value={unitOfMeasure}
              onChange={(e) => {
                setUnitOfMeasure(e.target.value);
              }}
            />
            <Input
              label="Centro de Custo"
              placeholder="Selecione a Categoria do Produto"
              value={costCenter}
              onChange={(e) => {
                setCostCenter(e.target.value);
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
              Adicionar Produto
            </Button>
          </>
        </Modal>
      )}

      {openEditModal && (
        <Modal
          title="Editar Produto"
          handleSubmit={handleEditSubmit}
          setOpenModal={setOpenEditModal}
        >
          <div>
            <Input
              label="Nome do Produto"
              placeholder="Insira o nome do Produto"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <Input
              label="Valor Unitário"
              placeholder="Insira o Valor do Item"
              type={"number"}
              min="0"
              value={value === 0 ? "" : value}
              onChange={(e) => {
                setValue(Number(e.target.value));
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
              Salvar alteraçõẽs
            </Button>
          </>
        </Modal>
      )}

      <div>
        <Input label="Fornecedor" placeholder="Informe o Fornecedor" />
        <Input
          label="Valor Total da Compra"
          placeholder="Informe o valor total da compra"
          type="number"
        />
      </div>
      <ItemsPurchasedContainer>
        <Divisor />
        <Title>Itens adquiridos</Title>
        {products.length ? (
          <MyTableExcel
            OpenEditModal={OpenEditModal}
            removeProduct={removeProduct}
            data={products}
          />
        ) : (
          <Text>Sem itens alocados a essa OS</Text>
        )}
        <Button
          outline
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
        <Button
          onClick={handlePurchaseSubmit}
          style={{ padding: "0 35px" }}
          color="#1AAE9F"
        >
          Salvar
        </Button>
      </ButtonsContainer>
    </Container>
  );
};

export default NewPurchase;
