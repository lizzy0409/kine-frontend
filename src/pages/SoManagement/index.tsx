import React, { FormEvent, useContext, useEffect, useState } from "react";
import MyTableExcel from "../../components/ExcelTable";

import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

import HeaderPage from "../../components/Header";

import {
  Container,
  InputLine,
  Label,
  Header,
  PlusIcon,
  PlusCircleIcon,
  Section,
  Title,
  ItemsPurchasedContainer,
  TitleProducts,
  Divisor,
  Text,
} from "./styles";
import InputWithLabelAtTheTop from "../../components/InputWithLabelAtTheTop";
import Button from "../../components/Button";
import ButtonWithIcon from "../../components/ButtonWithIcon";

import { ImBoxAdd, ImBoxRemove } from "react-icons/im";
import { IoKey } from "react-icons/io5";
import { FaLock, FaLockOpen } from "react-icons/fa";
import { MdViewHeadline } from "react-icons/md";

import Modal from "../../components/Modal";
import Input from "../../components/Input";
import api from "../../services/api";
import formatDate from "../../utils/formatDate";
import ButtonEdit from "../../components/ButtonEdit";
import ButtonRemoveProduct from "../../components/ButtonRemoveProduct";
import randomId from "../../utils/randomId";
import { SideBarContext } from "../../contexts/SideBarContext";

interface SOProps {
  id: string;
  SONumber: string;
  client: string;
  seller: string;
  responsibleTechnician: string;
  costOfSO: string;
  running: true;
  completed: false;
  closed: false;
}

interface ProductProps {
  id: string;
  name: string;
  value: number;
  quantity: number;
  unitOfMeasure: string;
  costCenter: string;
}

interface MaterialsProps {
  id: string;
  name: string;
  quantity: number;
  value: number;
}

interface Teste {
  inputValue?: string;
  name: string;
}

const SoManagement = () => {
  const { open } = useContext(SideBarContext);

  const [openEditModal, setOpenEditModal] = useState(false);
  const [id, setId] = useState("");

  const [modalAddEditableMaterial, setModalAddEditableMaterial] =
    useState(false);

  const [SORunning, setSORunning] = useState<SOProps[]>([]);
  const [SOCompleted, setSOCompleted] = useState<SOProps[]>([]);
  const [SOClosed, setSOClosed] = useState<SOProps[]>([]);

  const [products, setProducts] = useState<ProductProps[]>([]);

  const [client, setClient] = useState<Teste | null>(null);
  const [clients, setClients] = useState<Teste[]>([]);

  const [seller, setSeller] = useState<Teste | null>(null);
  const [sellers, setSellers] = useState<Teste[]>([]);

  const [responsibleTechnician, setResponsibleTechnician] =
    useState<Teste | null>(null);
  const [responsibleTechnicians, setResponsibleTechnicians] = useState<Teste[]>(
    []
  );

  const [closeAndSeeDetails, setCloseAndSeeDetails] = useState(false);

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
  const [openEndAnOsModal, setOpenEndAnOsModal] = useState(false);
  const [openOsDetailsModal, setOpenOsDetailsModal] = useState(false);

  const [SONumber, setSONumber] = useState<string>("");
  const [product, setProduct] = useState<Teste | null>(null);
  const [quantity, setQuantity] = useState(0);
  const [manpower, setManpower] = useState(0);
  const [displacement, setDisplacement] = useState(0);
  const [openingDate, setOpeningDate] = useState<Date>(new Date());
  const [closingDate, setClosingDate] = useState<Date>(new Date());

  const [materials, setMaterials] = useState<MaterialsProps[]>([]);

  const [materialsInStock, setMaterialsInStock] = useState<Teste[]>([]);
  const [materialsInSO, setMaterialsInSO] = useState<Teste[]>([]);

  const [addMaterialAndClose, setAddMaterialAndClose] = useState(false);

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
      materials: materials.map((data) => ({ ...data, id: undefined })),
    };

    api.post("/so", so);

    api.post("/clients", { name: so.client });
    api.post("/sellers", { name: so.seller });
    api.post("/responsibleTechnicians", { name: so.responsibleTechnician });

    setOpenServiceOrderRegistrationModal(false);
    getSO();
    getInputSearchResults();
    clearInputs();
    alert("Cadastro de OS feita com sucesso!");
  }

  async function getSO() {
    try {
      const { data } = await api.get<SOProps[]>("/so");

      setSORunning(data.filter((so: SOProps) => so.running));
      setSOCompleted(data.filter((so: SOProps) => so.completed));
      setSOClosed(data.filter((so: SOProps) => so.closed));
    } catch (error) {
      console.log(error);
    }
  }

  async function closeOS(id: string) {
    try {
      const { data } = await api.patch(`/so/${id}`, {
        running: false,
        completed: true,
        closed: false,
      });
      setSOCompleted([...SOCompleted, data]);
      setSORunning((so) => so.filter((el) => el.id !== id));
    } catch (error) {
      console.log(error);
    }
  }
  async function openOS(id: string) {
    try {
      const { data } = await api.patch(`/so/${id}`, {
        running: true,
        completed: false,
        closed: false,
      });
      setSOCompleted((so) => so.filter((el) => el.id !== id));
      setSORunning([...SORunning, data]);
    } catch (error) {
      console.log();
    }
  }

  function addMaterialToAnOs() {
    if (SONumber !== "" && client) {
      setOpenAddMaterialToAnSoModal(true);
    } else {
      alert("Preencha todos os dados antes de adicionar um material!");
    }
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

  async function handleEndAnOSSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      const { data } = await api.get(`/so?SONumber=${SONumber}`);
      await api.patch(`/so/${data[0].id}`, {
        manpower,
        displacement,
        running: false,
        completed: false,
        closed: true,
      });
      setOpenEndAnOsModal(false);
      clearInputs();
      getSO();
      console.log(closeAndSeeDetails);

      if (closeAndSeeDetails) {
        openOsDetails(data[0]);
        setCloseAndSeeDetails(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function openReturnAMaterialFromAnOs(so: SOProps) {
    setSONumber(so.SONumber);
    setClient({ name: so.client });
    setOpenReturnAMaterialFromAnOsModal(true);
    setModalAddEditableMaterial(true);

    try {
      const { data } = await api.get(`/so/${so.id}`);
      setMaterialsInSO(data.materials);
    } catch (error) {
      console.log(error);
    }
  }

  function openAddAMaterialFromAnOs(so: SOProps) {
    setSONumber(so.SONumber);
    setClient({ name: so.client });
    setModalAddEditableMaterial(true);
    setOpenAddMaterialToAnSoModal(true);
  }

  function openEndAnOs(so: SOProps) {
    setSONumber(so.SONumber);
    setClient({ name: so.client });
    setDisplacement(0);
    setManpower(0);
    setOpenEndAnOsModal(true);
  }

  async function openOsDetails(so: SOProps) {
    const { data } = await api.get(`/so/${so.id}`);
    setId(data.id);
    setProducts(data.materials);
    setOpeningDate(data.openingDate);
    setClosingDate(data.closingDate);
    setSONumber(data.SONumber);
    setClient({ name: data.client });
    setResponsibleTechnician({ name: data.responsibleTechnician });
    setSeller({ name: data.seller });
    setManpower(data.manpower);
    setDisplacement(data.displacement);
    setOpenOsDetailsModal(true);
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
      setOpenReturnAMaterialFromAnOsModal(false);
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
  function OpenEditModal(material: MaterialsProps) {
    setOpenEditModal(true);
    setId(material.id);
    setProduct({ name: material.name });
    setQuantity(material.quantity);
  }

  function removeProduct(material: MaterialsProps) {
    setMaterials((data) => data.filter((item) => item !== material));
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

  useEffect(() => {
    setProduct(null);
    setQuantity(0);
  }, [openAddMaterialToAnSoModal, openReturnAMaterialFromAnOsModal]);

  useEffect(() => {
    getSO();
    getInputSearchResults();
  }, []);

  useEffect(() => {
    if (openServiceOrderRegistrationModal) {
      clearInputs();
    }
  }, [openServiceOrderRegistrationModal]);

  return (
    <>
      <HeaderPage pageName={"Gestão de OS"} />

      <Container open={open}>
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
              <Input label="Número da OS" disabled={true} value={SONumber} />
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
                Voltar para OS
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
                  Adicionar Material
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
              <Input label="Número da OS" disabled={true} value={SONumber} />
              <Input label="Cliente" disabled={true} value={client?.name} />
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
                <Button outline type="submit" color="#1AAE9F">
                  Salvar e Adicionar Mais itens
                </Button>
                <Button
                  style={{ marginLeft: 20 }}
                  type="submit"
                  color="#1AAE9F"
                >
                  Salvar
                </Button>
              </div>
            </>
          </Modal>
        )}

        {openEndAnOsModal && (
          <Modal
            title="Encerrar uma OS"
            handleSubmit={handleEndAnOSSubmit}
            setOpenModal={setOpenEndAnOsModal}
          >
            <div>
              <Input label="Número da OS" disabled={true} value={SONumber} />
              <Input label="Cliente" disabled={true} value={client?.name} />
              <Input
                label="Mão de obra"
                placeholder="Informe quantas horas essa obra durou"
                type="number"
                value={manpower === 0 ? "" : manpower}
                onChange={(e) => {
                  setManpower(Number(e.target.value));
                }}
              />
              <Input
                label="Deslocamento"
                placeholder="Informe a quantidade de visitas"
                type="number"
                value={displacement === 0 ? "" : displacement}
                onChange={(e) => {
                  setDisplacement(Number(e.target.value));
                }}
              />
            </div>
            <>
              <Button
                type="button"
                outline
                color="#6558F5"
                onClick={() => {
                  setOpenEndAnOsModal(false);
                }}
              >
                Cancelar
              </Button>
              <div style={{ display: "flex" }}>
                <Button
                  outline
                  type="submit"
                  color="#1AAE9F"
                  onClick={() => setCloseAndSeeDetails(true)}
                >
                  Encerrar e ver Detalhes
                </Button>
                <Button
                  style={{ marginLeft: 20 }}
                  type="submit"
                  color="#1AAE9F"
                >
                  Encerrar OS
                </Button>
              </div>
            </>
          </Modal>
        )}

        {openOsDetailsModal && (
          <Modal
            title="Detalhes da OS"
            handleSubmit={handleServiceOrderRegistration}
            setOpenModal={setOpenOsDetailsModal}
          >
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

            <>
              <Button
                type="button"
                outline
                color="#6558F5"
                onClick={() => {
                  setOpenOsDetailsModal(false);
                }}
              >
                Fechar
              </Button>
              <div style={{ display: "flex" }}>
                <Button
                  style={{ marginLeft: 20 }}
                  type="button"
                  onClick={() => {
                    alert("Negociar funcionalidade (44) 9 9957-1618");
                  }}
                  color="#1AAE9F"
                >
                  Editar
                </Button>
                <a
                  href={`/imprimir/${id}`}
                  rel="noreferrer"
                  target="_blank"
                  style={{ textDecoration: "none" }}
                >
                  <Button
                    type="button"
                    style={{ marginLeft: 20 }}
                    color="#1AAE9F"
                  >
                    Imprimir OS
                  </Button>
                </a>
              </div>
            </>
          </Modal>
        )}

        <Header>
          <InputWithLabelAtTheTop
            label="Pesquisar"
            placeholder="Cliente, número ou vendedor"
          />
          <Button
            color="#1AAE9F"
            onClick={() => {
              setOpenServiceOrderRegistrationModal(true);
            }}
          >
            <PlusIcon /> Nova OS
          </Button>
        </Header>
        <Section>
          <Title>Em execução:</Title>
          {SORunning.length !== 0 ? (
            <MyTableExcel
              style={{ margin: 0 }}
              columns={[
                { name: "Número da OS" },
                { name: "Cliente" },
                { name: "Vendedor" },
                { name: "Técnico" },
                { name: "Custo da OS" },
                { name: "Ações", align: "right" },
              ]}
            >
              {SORunning.map((so: SOProps) => (
                <TableRow key={so.id}>
                  <TableCell width={150} component="th" scope="row">
                    {so.SONumber}
                  </TableCell>
                  <TableCell align="left">{so.client}</TableCell>
                  <TableCell align="left">{so.seller}</TableCell>
                  <TableCell align="left">{so.responsibleTechnician}</TableCell>
                  <TableCell align="left">R$ {so.costOfSO}</TableCell>
                  <TableCell align="right" width={160}>
                    <ButtonWithIcon
                      Icon={IoKey}
                      onClick={() => {
                        closeOS(so.id);
                      }}
                    />
                    <ButtonWithIcon
                      Icon={ImBoxAdd}
                      onClick={() => {
                        openAddAMaterialFromAnOs(so);
                      }}
                    />
                    <ButtonWithIcon
                      Icon={ImBoxRemove}
                      onClick={() => {
                        openReturnAMaterialFromAnOs(so);
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </MyTableExcel>
          ) : (
            <p style={{ marginTop: 20, fontWeight: 500 }}>
              Sem obras em execução
            </p>
          )}
        </Section>
        <Section>
          <Title>Obras concluidas:</Title>
          {SOCompleted.length !== 0 ? (
            <MyTableExcel
              style={{ margin: 0 }}
              columns={[
                { name: "Número da OS" },
                { name: "Cliente" },
                { name: "Vendedor" },
                { name: "Técnico" },
                { name: "Custo da OS" },
                { name: "Ações", align: "right" },
              ]}
            >
              {SOCompleted.map((so: SOProps) => (
                <TableRow key={so.id}>
                  <TableCell width={150} component="th" scope="row">
                    {so.SONumber}
                  </TableCell>
                  <TableCell align="left">{so.client}</TableCell>
                  <TableCell align="left">{so.seller}</TableCell>
                  <TableCell align="left">{so.responsibleTechnician}</TableCell>
                  <TableCell align="left">R$ {so.costOfSO}</TableCell>
                  <TableCell align="right" width={160}>
                    <ButtonWithIcon
                      Icon={FaLockOpen}
                      onClick={() => {
                        openOS(so.id);
                      }}
                    />
                    <ButtonWithIcon
                      Icon={FaLock}
                      onClick={() => {
                        openEndAnOs(so);
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </MyTableExcel>
          ) : (
            <p style={{ marginTop: 20, fontWeight: 500 }}>
              Sem obras concluidas
            </p>
          )}
        </Section>
        <Section>
          <Title>Os Encerradas:</Title>
          {SOClosed.length !== 0 ? (
            <MyTableExcel
              style={{ margin: 0 }}
              columns={[
                { name: "Número da OS" },
                { name: "Cliente" },
                { name: "Vendedor" },
                { name: "Técnico" },
                { name: "Custo da OS" },
                { name: "Ações", align: "right" },
              ]}
            >
              {SOClosed.map((so: SOProps) => (
                <TableRow key={so.id}>
                  <TableCell width={150} component="th" scope="row">
                    {so.SONumber}
                  </TableCell>
                  <TableCell align="left">{so.client}</TableCell>
                  <TableCell align="left">{so.seller}</TableCell>
                  <TableCell align="left">{so.responsibleTechnician}</TableCell>
                  <TableCell align="left">R$ {so.costOfSO}</TableCell>
                  <TableCell align="right" width={160}>
                    <ButtonWithIcon
                      Icon={MdViewHeadline}
                      onClick={() => {
                        openOsDetails(so);
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </MyTableExcel>
          ) : (
            <p style={{ marginTop: 20, fontWeight: 500 }}>
              Sem obras encerradas
            </p>
          )}
        </Section>
      </Container>
    </>
  );
};

export default SoManagement;
