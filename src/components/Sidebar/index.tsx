import React, { useContext, useEffect, useState } from "react";

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
  Icon,
} from "./styles";
import api from "../../services/api";
import { SideBarContext } from "../../contexts/SideBarContext";
import { useLocation } from "react-router-dom";

const Sidebar: React.FC = () => {
  const arr = ["/estoque-atual", "/gestao-de-os"];

  const [alwaysOpen, setAlwaysOpen] = useState(false);
  const { activePage, setActivePage } = useContext(SideBarContext);

  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState<File | string>("");
  const [avatarUrl, setAvatarUrl] = useState(AvatarImage);

  const { open, setOpen } = useContext(SideBarContext);

  const location = useLocation();

  useEffect(() => {
    setAlwaysOpen(arr.includes(location.pathname));
  }, [arr, location, setAlwaysOpen]);

  const handleChange = (files: FileList | null) => {
    if (files) {
      setAvatar(files[0]);
      setAvatarUrl(URL.createObjectURL(files[0]));
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

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Container open={alwaysOpen ? true : !!open}>
      {setOpen && !alwaysOpen && (
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
            <Icon active={activePage === 0} />
            Início
          </MenuItem>
          {/*<MenuItem
            to="/gestao-de-os"
            active={activePage === 1}
            onClick={() => setActivePage(1)}
          >
            <Icon active={activePage === 1} />
            Nova OS
          </MenuItem>*/}
          <MenuItem
            to="/estoque-atual"
            active={activePage === 2}
            onClick={() => setActivePage(2)}
          >
            <Icon active={activePage === 2} />
            Nova Compra
          </MenuItem>
          <MenuItem
            to="/estoque-atual"
            active={activePage === 3}
            onClick={() => setActivePage(3)}
          >
            <Icon active={activePage === 3} />
            Estoque Atual
          </MenuItem>
          <MenuItem
            to="/gestao-de-os"
            active={activePage === 4}
            onClick={() => setActivePage(4)}
          >
            <Icon active={activePage === 4} />
            Gestão das OS's
          </MenuItem>
          <MenuItem
            to="/gerenciar-usuarios"
            active={activePage === 5}
            onClick={() => setActivePage(5)}
          >
            <Icon active={activePage === 5} />
            Gerenciar Usuários
          </MenuItem>
        </Menu>
      </Content>
    </Container>
  );
};

export default Sidebar;
