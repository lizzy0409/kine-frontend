import React, { FormEvent, useContext, useEffect, useState } from "react";
import Card from "../../components/Card";
import Header from "../../components/Header";
import Input from "../../components/Input";
import Modal from "../../components/Modal";

import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import MyTableExcel from "../../components/ExcelTable";

import { Wrapper, InputLine, Label, PlusCircleIcon, Container } from "./styles";
import Button from "../../components/Button";
import api from "../../services/api";
import { SideBarContext } from "../../contexts/SideBarContext";

import { useHistory } from "react-router-dom";

import {
  MdPlaylistAdd,
  MdAddShoppingCart,
  MdRemoveShoppingCart,
} from "react-icons/md";

import { FiShoppingBag } from "react-icons/fi";
import { IoMdReturnLeft } from "react-icons/io";
import { RiFileEditFill } from "react-icons/ri";
import ButtonEdit from "../../components/ButtonEdit";
import ButtonRemoveProduct from "../../components/ButtonRemoveProduct";
import randomId from "../../utils/randomId";

interface MaterialsProps {
  id: string;
  name: string;
  quantity: number;
  value: number;
}

interface ProductProps {
  id: string;
  name: string;
  value: number;
  quantity: number;
  measureUnit: string;
  costCenter: string;
}

interface Teste {
  inputValue?: string;
  name: string;
}

const Home: React.FC = () => {
  const { open } = useContext(SideBarContext);

  const [openEditModal, setOpenEditModal] = useState(false);
  const [id, setId] = useState("");

  const history = useHistory();
  const { setActivePage } = useContext(SideBarContext);

  const [modalAddEditableMaterial, setModalAddEditableMaterial] =
    useState(false);

  const [
    openServiceOrderRegistrationModal,
    setOpenServiceOrderRegistrationModal,
  ] = useState(false);

  const [openAddMaterialToAnSoModal, setOpenAddMaterialToAnSoModal] =
    useState(false);
  const [
    openReturnAMaterialFromAnOsModal,
    setOpenReturnAMaterialFromAnOsModal,
  ] = useState(false);

  const [client, setClient] = useState<Teste | null>(null);
  const [clients, setClients] = useState<Teste[]>([]);

  const [seller, setSeller] = useState<Teste | null>(null);
  const [sellers, setSellers] = useState<Teste[]>([]);

  const [responsibleTechnician, setResponsibleTechnician] =
    useState<Teste | null>(null);
  const [responsibleTechnicians, setResponsibleTechnicians] = useState<Teste[]>(
    []
  );

  const [SONumber, setSONumber] = useState<string>("");
  const [product, setProduct] = useState<Teste | null>(null);
  const [quantity, setQuantity] = useState(0);

  const [materials, setMaterials] = useState<MaterialsProps[]>([]);

  const [materialsInStock, setMaterialsInStock] = useState<Teste[]>([]);
  const [materialsInSO, setMaterialsInSO] = useState<Teste[]>([]);

  const [addMaterialAndClose, setAddMaterialAndClose] = useState(false);
  const [returnMaterialAndClose, setReturnMaterialAndClose] = useState(false);

  function clearInputs() {
    setSONumber("");
    setClient(null);
    setSeller(null);
    setResponsibleTechnician(null);
    setMaterials([]);
    setProduct(null);
    setQuantity(0);
  }

  function handleServiceOrderRegistration(e: FormEvent) {
    e.preventDefault();
    const so = {
      SONumber,
      client: client?.name || "",
      seller: seller?.name || "",
      responsibleTechnician: responsibleTechnician?.name || "",
      costOfSO: "2000",
      running: true,
      completed: false,
      closed: false,
      openingDate: new Date(),
      closingDate: new Date(),
      materials,
    };

    api.post("/so", so);

    api.post("/clients", { name: so.client });
    api.post("/sellers", { name: so.seller });
    api.post("/responsibleTechnicians", { name: so.responsibleTechnician });

    setOpenServiceOrderRegistrationModal(false);
    getInputSearchResults();
    clearInputs();
    alert("Cadastro de OS feita com sucesso!");
  }
  async function handleAddMaterialToAnSoModal(e: FormEvent) {
    e.preventDefault();
    if (modalAddEditableMaterial) {
      try {
        const { data: so } = await api.get(`/so?SONumber=${SONumber}`);
        const { data: productData } = await api.get(
          `/products?name=${product!.name}`
        );

        await api.patch(`so/${so[0].id}`, {
          materials: [
            ...so[0].materials,
            { name: product!.name, quantity, value: productData[0].value },
          ],
        });
        if (addMaterialAndClose) {
          setOpenAddMaterialToAnSoModal(false);
        } else {
          setProduct(null);
          setQuantity(0);
          setOpenAddMaterialToAnSoModal(true);
        }
        alert("Material alocado");
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const { data } = await api.get(`/products?name=${product!.name}`);

        if (addMaterialAndClose) {
          setMaterials([
            ...materials,
            {
              id: randomId(),
              name: product!.name,
              quantity,
              value: data[0].value,
            },
          ]);
          setOpenAddMaterialToAnSoModal(false);
        } else {
          setMaterials([
            ...materials,
            {
              id: randomId(),
              name: product!.name,
              quantity,
              value: data[0].value,
            },
          ]);
          setProduct(null);
          setQuantity(0);
          setOpenAddMaterialToAnSoModal(true);
        }
      } catch (error) {
        console.log(error);
      }
    }
    setModalAddEditableMaterial(false);
  }

  async function getInputSearchResults() {
    try {
      const { data } = await api.get<ProductProps[]>("/products");

      let parsedData: Teste[] = [];

      data.forEach((product) => {
        parsedData.push({ name: product.name });
      });
      setMaterialsInStock(parsedData);

      const { data: clients } = await api.get("/clients");
      setClients(clients);

      const { data: sellers } = await api.get("/sellers");
      setSellers(sellers);

      const { data: responsibleTechnicians } = await api.get(
        "/responsibleTechnicians"
      );
      setResponsibleTechnicians(responsibleTechnicians);
    } catch (error) {
      console.log(error);
    }
  }

  function addMaterialToAnOs() {
    if (SONumber !== "" && client) {
      setOpenAddMaterialToAnSoModal(true);
    } else {
      alert("Preencha todos os dados antes de adicionar um material!");
    }
  }

  function openNewPurchase() {
    setActivePage(2);
    history.push("estoque-atual");
  }
  function openCurrentStock() {
    setActivePage(3);
    history.push("estoque-atual");
  }
  function openSOManagement() {
    setActivePage(4);
    history.push("gestao-de-os");
  }

  async function getClient() {
    try {
      const { data } = await api.get(`/so?SONumber=${SONumber}`);

      setClient({ name: data[0] ? data[0].client : "Sem cliente" });
    } catch (error) {
      console.log(error);
    }
  }

  function openAddMaterial() {
    setModalAddEditableMaterial(true);
    setOpenAddMaterialToAnSoModal(true);
  }

  async function openReturnAMaterialFromAnOs() {
    setOpenReturnAMaterialFromAnOsModal(true);
  }

  async function handleReturnServiceOrder(e: FormEvent) {
    e.preventDefault();

    try {
      const material = {
        SONumber,
        client: client?.name,
        product: product?.name,
        quantity,
      };
      await api.post("/return-material", material);
      alert("Material retornou ao estoque!");
      if (returnMaterialAndClose) {
        setOpenReturnAMaterialFromAnOsModal(false);
      } else {
        setProduct(null);
        setQuantity(0);
        setOpenReturnAMaterialFromAnOsModal(true);
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function editProduct(material: MaterialsProps) {
    setMaterials((data) =>
      data.map((item) => {
        if (item.id === material.id) {
          return {
            id: material.id,
            value: item.value,
            name: material.name,
            quantity: material.quantity,
          };
        }
        return item;
      })
    );
  }
  async function handleEditSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      const { data } = await api.get(`/products?name=${product!.name}`);

      const material: MaterialsProps = {
        id: id,
        name: product?.name || "",
        value: data[0].value,
        quantity,
      };
      editProduct(material);
      setOpenEditModal(false);
    } catch (error) {
      console.log(error);
    }
  }
  function OpenEditModal(material: MaterialsProps) {
    setOpenEditModal(true);
    setId(material.id);
    setProduct({ name: material.name });
    setQuantity(material.quantity);
  }

  function removeProduct(material: MaterialsProps) {
    setMaterials((data) => data.filter((item) => item !== material));
  }

  useEffect(() => {
    getInputSearchResults();
  }, []);
  useEffect(() => {
    if (!openAddMaterialToAnSoModal) {
      setModalAddEditableMaterial(false);
    }
  }, [openAddMaterialToAnSoModal]);

  useEffect(() => {
    if (modalAddEditableMaterial) {
      setSONumber("");
      setClient({ name: "" });
    }
    setProduct(null);
    setQuantity(0);
  }, [
    modalAddEditableMaterial,
    openAddMaterialToAnSoModal,
    openReturnAMaterialFromAnOsModal,
  ]);

  return (
    <>
      <Header pageName={"Início"} />
      <Wrapper open={open}>
        {openEditModal && (
          <Modal
            title="Editar Produto"
            handleSubmit={handleEditSubmit}
            setOpenModal={setOpenEditModal}
            style={{ zIndex: 100 }}
          >
            <div>
              <Input
                inputSearch
                data={materialsInStock}
                label="Nome do Produto"
                noAddOption
                placeholder="Insira o nome do Produto"
                inputSearchValue={product}
                setValue={setProduct}
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
                  setOpenEditModal(false);
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
        {openServiceOrderRegistrationModal && (
          <Modal
            title="Cadastro de Ordem de Serviço"
            handleSubmit={handleServiceOrderRegistration}
            setOpenModal={setOpenServiceOrderRegistrationModal}
            style={{
              opacity: openAddMaterialToAnSoModal || openEditModal ? 0 : 1,
            }}
          >
            <div>
              <Input
                label="Número da OS"
                placeholder="Insira o número da OS"
                value={SONumber}
                type="number"
                min="0"
                onChange={(e) => {
                  setSONumber(e.target.value);
                }}
              />
              <Input
                inputSearch
                data={clients}
                label="Cliente"
                placeholder="Insira o cliente"
                inputSearchValue={client}
                setValue={setClient}
              />
              <Input
                inputSearch
                data={sellers}
                label="Vendedor"
                placeholder="Insira o nome do vendedor"
                inputSearchValue={seller}
                setValue={setSeller}
              />
              <Input
                inputSearch
                data={responsibleTechnicians}
                label="Técnico Responsável"
                placeholder="Insira o nome do técnico responsável"
                inputSearchValue={responsibleTechnician}
                setValue={setResponsibleTechnician}
              />

              <InputLine
                style={{
                  gridTemplateColumns: "1fr 2.5fr",
                  padding: 0,
                  gap: 60,
                }}
              >
                <Label>Materiais</Label>
                <div>
                  <Label className="label-top">
                    {materials.length !== 0 ? (
                      <MyTableExcel
                        style={{ margin: 0 }}
                        columns={[
                          { name: "Material" },
                          { name: "Quantidade" },
                          { name: "Ações" },
                        ]}
                      >
                        {materials.map((material: MaterialsProps) => (
                          <TableRow key={material.name}>
                            <TableCell width={150} component="th" scope="row">
                              {material.name}
                            </TableCell>
                            <TableCell align="left">
                              {material.quantity}
                            </TableCell>
                            <TableCell align="right">
                              <ButtonEdit
                                onClick={() => OpenEditModal(material)}
                              />
                              <ButtonRemoveProduct
                                onClick={() => removeProduct(material)}
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                      </MyTableExcel>
                    ) : (
                      "Sem itens alocados a essa OS"
                    )}
                  </Label>
                  <Button
                    type="button"
                    outline
                    color="#6558F5"
                    onClick={() => {
                      addMaterialToAnOs();
                    }}
                  >
                    <PlusCircleIcon /> Adicionar Material á OS
                  </Button>
                </div>
              </InputLine>
            </div>
            <>
              <Button
                type="button"
                outline
                color="#6558F5"
                onClick={() => {
                  setOpenServiceOrderRegistrationModal(false);
                }}
              >
                Cancelar
              </Button>
              <Button type="submit" color="#1AAE9F">
                Criar OS
              </Button>
            </>
          </Modal>
        )}
        {openAddMaterialToAnSoModal && (
          <Modal
            title="Adicionar Material à uma OS"
            handleSubmit={handleAddMaterialToAnSoModal}
            setOpenModal={setOpenAddMaterialToAnSoModal}
          >
            <div>
              <Input
                label="Número da OS"
                disabled={!modalAddEditableMaterial}
                value={SONumber}
                onChange={
                  modalAddEditableMaterial
                    ? (e) => {
                        setSONumber(e.target.value);
                      }
                    : undefined
                }
                onBlur={getClient}
              />
              <Input
                label="Cliente"
                disabled={true}
                value={client?.name || ""}
              />
              <Input
                inputSearch
                noAddOption
                data={materialsInStock}
                label="Produto"
                placeholder="Ex: Mangueira, Parafuso, Suporte, etc..."
                inputSearchValue={product}
                setValue={setProduct}
              />

              <Input
                label="Quantidade"
                placeholder="Informe a quantidade do material"
                type="number"
                value={quantity === 0 ? "" : quantity}
                min="0"
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
                  setOpenAddMaterialToAnSoModal(false);
                }}
              >
                Cancelar
              </Button>
              <div style={{ display: "flex" }}>
                <Button
                  outline
                  type="submit"
                  color="#1AAE9F"
                  onClick={() => {
                    setAddMaterialAndClose(false);
                  }}
                >
                  Salvar e Adicionar Mais itens
                </Button>
                <Button
                  style={{ marginLeft: 20 }}
                  type="submit"
                  color="#1AAE9F"
                  onClick={() => {
                    setAddMaterialAndClose(true);
                  }}
                >
                  Salvar
                </Button>
              </div>
            </>
          </Modal>
        )}

        {openReturnAMaterialFromAnOsModal && (
          <Modal
            title="Retornar o Material à uma OS"
            handleSubmit={handleReturnServiceOrder}
            setOpenModal={setOpenReturnAMaterialFromAnOsModal}
          >
            <div>
              <Input
                label="Número da OS"
                value={SONumber}
                type="number"
                onChange={(e) => {
                  setSONumber(e.target.value);
                }}
                onBlur={async () => {
                  getClient();
                  try {
                    const { data } = await api.get(`/so?SONumber=${SONumber}`);
                    setMaterialsInSO(data[0].materials);
                  } catch (error) {
                    console.log(error);
                  }
                }}
              />
              <Input label="Cliente" value={client?.name} disabled={true} />
              <Input
                inputSearch
                noAddOption
                data={materialsInSO}
                label="Produto"
                placeholder="Ex: Mangueira, Parafuso, Suporte, etc..."
                inputSearchValue={product}
                setValue={setProduct}
              />
              <Input
                label="Quantidade"
                placeholder="Informe a quantidade do material"
                type="number"
                value={quantity === 0 ? "" : quantity}
                min="0"
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
                  setOpenReturnAMaterialFromAnOsModal(false);
                }}
              >
                Cancelar
              </Button>
              <div style={{ display: "flex" }}>
                <Button
                  outline
                  type="submit"
                  color="#1AAE9F"
                  onClick={() => {
                    setReturnMaterialAndClose(false);
                  }}
                >
                  Salvar e retornar mais itens
                </Button>
                <Button
                  style={{ marginLeft: 20 }}
                  type="submit"
                  color="#1AAE9F"
                  onClick={() => {
                    setReturnMaterialAndClose(true);
                  }}
                >
                  Salvar
                </Button>
              </div>
            </>
          </Modal>
        )}
        <Container>
          <Card
            title="Nova OS"
            text="Registrar uma nova ordem de serviço"
            Icon={MdPlaylistAdd}
            onClick={() => {
              setOpenServiceOrderRegistrationModal(true);
            }}
          />
          <Card
            title="Nova Compra"
            text="Registrar a entrada de itens no almoxarifado"
            Icon={MdAddShoppingCart}
            onClick={openNewPurchase}
          />
          <Card
            title="Saida do Estoque"
            text="Registrar a saída de itens do almoxarifado, para uma obra"
            Icon={MdRemoveShoppingCart}
            onClick={openAddMaterial}
          />
          <Card
            title="Retorno ao Estoque"
            text="Registrar o retorno dos itens que tinham ido para uma obra"
            Icon={IoMdReturnLeft}
            onClick={openReturnAMaterialFromAnOs}
          />
          <Card
            title="Estoque"
            text="Visualizar o estoque completo"
            Icon={FiShoppingBag}
            onClick={openCurrentStock}
          />
          <Card
            title="Gerenciar OS's"
            text="Visualizar todas as OS do sistema"
            Icon={RiFileEditFill}
            onClick={openSOManagement}
          />
        </Container>
      </Wrapper>
    </>
  );
};

export default Home;
