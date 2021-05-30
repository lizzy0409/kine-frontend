import React, { useState } from "react";

import avatar from "../../assets/pp.jpeg";

import {
  Container,
  CloseSidebar,
  CloseIcon,
  Content,
  Avatar,
  Name,
  Menu,
  Indicator,
  MenuItem,
  Icon,
} from "./styles";

interface SidebarProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({ open, setOpen }) => {
  const [activePage, setActivePage] = useState(0);

  return (
    <Container open={!!open}>
      <CloseSidebar
        onClick={() => {
          setOpen(false);
        }}
      >
        Fechar Menu <CloseIcon />
      </CloseSidebar>

      <Content>
        <Avatar src={avatar} />
        <Name>Heitor Franco</Name>
        <Menu>
          <Indicator index={activePage} />
          <MenuItem active={activePage === 0} onClick={() => setActivePage(0)}>
            <Icon active={activePage === 0} />
            Início
          </MenuItem>
          <MenuItem active={activePage === 1} onClick={() => setActivePage(1)}>
            <Icon active={activePage === 1} />
            Nova OS
          </MenuItem>
          <MenuItem active={activePage === 2} onClick={() => setActivePage(2)}>
            <Icon active={activePage === 2} />
            Nova Compra
          </MenuItem>
          <MenuItem active={activePage === 3} onClick={() => setActivePage(3)}>
            <Icon active={activePage === 3} />
            Estoque Atual
          </MenuItem>
          <MenuItem active={activePage === 4} onClick={() => setActivePage(4)}>
            <Icon active={activePage === 4} />
            Gestão das OS's
          </MenuItem>
        </Menu>
      </Content>
    </Container>
  );
};

export default Sidebar;
