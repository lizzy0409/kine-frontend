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
} from "./styles";
import api from "../../services/api";
import { SideBarContext } from "../../contexts/SideBarContext";
import { useLocation } from "react-router-dom";

import { MdPlaylistAdd, MdAddShoppingCart } from "react-icons/md";

import { FiShoppingBag } from "react-icons/fi";
import { RiFileEditFill } from "react-icons/ri";
import { AiFillHome } from "react-icons/ai";
import { FaUserEdit } from "react-icons/fa";

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
    <Container
      style={{ opacity: location.pathname == "/print" ? "0" : "1" }}
      open={alwaysOpen ? true : !!open}
    >
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
            <AiFillHome className="icon" />
            Início
          </MenuItem>
          <MenuItem
            to="/gestao-de-os"
            active={activePage === 1}
            onClick={() => {
              alert("Em Desenvolvimento");
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
  );
};

export default Sidebar;
