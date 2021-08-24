import React, { FormEvent, useContext, useEffect, useState } from "react";

import AvatarImage from "../../assets/user.png";

import { MdEdit } from "react-icons/md";

import {
  Container,
  CloseSidebar,
  CloseIcon,
  Content,
  AvatarContainer,
  Avatar,
  EditAvatarButton,
  Name,
  Menu,
  Indicator,
  MenuItem,
  InputLine,
  Label,
  PlusCircleIcon,
} from "./styles";
import api from "../../services/api";
import { SideBarContext } from "../../contexts/SideBarContext";
import { useLocation } from "react-router-dom";

import { MdPlaylistAdd, MdAddShoppingCart } from "react-icons/md";

import Modal from "../../components/Modal";
import Input from "../../components/Input";
import Button from "../../components/Button";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import MyTableExcel from "../../components/ExcelTable";

import { FiShoppingBag } from "react-icons/fi";
import { RiFileEditFill } from "react-icons/ri";
import { AiFillHome } from "react-icons/ai";
import { FaUserEdit } from "react-icons/fa";
import ButtonEdit from "../ButtonEdit";
import ButtonRemoveProduct from "../ButtonRemoveProduct";
import randomId from "../../utils/randomId";

interface Teste {
  inputValue?: string;
  name: string;
}

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

const Sidebar: React.FC = () => {
  const { activePage, setActivePage } = useContext(SideBarContext);

  const [openEditModal, setOpenEditModal] = useState(false);
  const [addMaterialAndClose, setAddMaterialAndClose] = useState(false);
  const [id, setId] = useState("");
  const [modalAddEditableMaterial, setModalAddEditableMaterial] =
    useState(false);

  const [
    openServiceOrderRegistrationModal,
    setOpenServiceOrderRegistrationModal,
  ] = useState(false);

  const [openAddMaterialToAnSoModal, setOpenAddMaterialToAnSoModal] =
    useState(false);

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

  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState<File | string>("");
  const [avatarUrl, setAvatarUrl] = useState(AvatarImage);

  const { open, setOpen } = useContext(SideBarContext);

  const location = useLocation();

  const handleChange = (files: FileList | null) => {
    if (files) {
      setAvatar(files[0]);
      setAvatarUrl(URL.createObjectURL(files[0]));
      const dataToBackend = new FormData();

      dataToBackend.append("file", files[0]);

      api.post("/avatar", dataToBackend);
    }
  };

  async function getUser() {
    try {
      const id = localStorage.getItem("@kine:id");

      const { data } = await api.get(`/users/${id}`);
      setAvatarUrl(data.avatarUrl);
      setName(data.name);
    } catch (error) {
      console.log(error);
    }
  }
  async function handleAddMaterialToAnSoModal(e: FormEvent) {
    e.preventDefault();
    if (modalAddEditableMaterial) {
      try {
        const { data: so } = await api.get(`/serviceOrders?number${SONumber}`);
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

  function clearInputs() {
    setSONumber("");
    setClient(null);
    setSeller(null);
    setResponsibleTechnician(null);
    setMaterials([]);
    setProduct(null);
    setQuantity(0);
  }

  function removeProduct(material: MaterialsProps) {
    setMaterials((data) => data.filter((item) => item !== material));
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

      const { data: responsibleTechnicians } = await api.get("/technicians");
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

    api.post("/serviceOrders", so);

    api.post("/clients", { name: so.client });
    api.post("/sellers", { name: so.seller });
    api.post("/technicians", { name: so.responsibleTechnician });

    setOpenServiceOrderRegistrationModal(false);
    getInputSearchResults();
    clearInputs();
    alert("Cadastro de OS feita com sucesso!");
  }

  function OpenEditModal(material: MaterialsProps) {
    setOpenEditModal(true);
    setId(material.id);
    setProduct({ name: material.name });
    setQuantity(material.quantity);
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

  useEffect(() => {
    getUser();
    getInputSearchResults();
  }, []);

  return (
    <>
      {!location.pathname.includes("/imprimir") &&
        location.pathname !== "/entrar" &&
        location.pathname !== "/cadastrar" && (
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
                                <TableCell
                                  width={150}
                                  component="th"
                                  scope="row"
                                >
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
                    disabled={true}
                    value={SONumber}
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

            {setOpen && (
              <CloseSidebar
                onClick={() => {
                  setOpen(false);
                }}
              >
                Fechar Menu <CloseIcon />
              </CloseSidebar>
            )}

            <Content>
              <AvatarContainer>
                <Avatar src={avatarUrl} />
                <EditAvatarButton htmlFor="upload">
                  <MdEdit color={"#6558F5"} fontSize={20} />
                </EditAvatarButton>
                <input
                  id="upload"
                  type="file"
                  onChange={(e) => handleChange(e.target.files)}
                  style={{ opacity: 0 }}
                />
              </AvatarContainer>
              <Name>{name}</Name>
              <Menu>
                <Indicator index={activePage} />
                <MenuItem
                  to="/"
                  active={activePage === 0}
                  onClick={() => setActivePage(0)}
                >
                  <AiFillHome className="icon" />
                  Início
                </MenuItem>
                <MenuItem
                  to="#"
                  active={activePage === 1}
                  onClick={() => {
                    setOpenServiceOrderRegistrationModal(true);
                  }}
                >
                  <MdPlaylistAdd className="icon" />
                  Nova OS
                </MenuItem>

                <MenuItem
                  to="/estoque-atual"
                  active={activePage === 2}
                  onClick={() => setActivePage(2)}
                >
                  <MdAddShoppingCart className="icon" />
                  Nova Compra
                </MenuItem>
                <MenuItem
                  to="/estoque-atual"
                  active={activePage === 3}
                  onClick={() => setActivePage(3)}
                >
                  <FiShoppingBag className="icon" />
                  Estoque Atual
                </MenuItem>
                <MenuItem
                  to="/gestao-de-os"
                  active={activePage === 4}
                  onClick={() => setActivePage(4)}
                >
                  <RiFileEditFill className="icon" />
                  Gestão das OS's
                </MenuItem>
                <MenuItem
                  to="/gerenciar-usuarios"
                  active={activePage === 5}
                  onClick={() => setActivePage(5)}
                >
                  <FaUserEdit className="icon" />
                  Gerenciar Usuários
                </MenuItem>
              </Menu>
            </Content>
          </Container>
        )}
    </>
  );
};

export default Sidebar;
