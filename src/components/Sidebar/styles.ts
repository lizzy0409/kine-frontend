import styled from "styled-components";
import { FiPlusCircle } from "react-icons/fi";

import { Link } from "react-router-dom";

import { IoCloseSharp } from "react-icons/io5";

interface ContainerProps {
  open: boolean;
}

interface MenuItemsProps {
  active?: boolean;
}

interface Indicador {
  index: number;
}

export const Container = styled.div<ContainerProps>`
  background-color: #c3cfd9;
  position: fixed;
  left: ${({ open }) => (open ? 0 : "-300px")};
  top: 0;
  width: 300px;
  height: 100%;
  z-index: 1;

  transition: left 0.5s;

  border-right: 3px solid #788896;
  border-bottom: 3px solid #788896;
  padding-top: 120px;
`;

export const CloseSidebar = styled.div`
  position: absolute;
  right: 20px;
  top: 20px;

  display: flex;
  align-items: center;

  cursor: pointer;
`;
export const CloseIcon = styled(IoCloseSharp)`
  color: #4b5c6b;
  font-size: 30px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const AvatarContainer = styled.div`
  width: 178px;
  height: 178px;
  position: relative;
`;

export const Avatar = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
`;

export const EditAvatarButton = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  right: 10px;
  bottom: 5px;

  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #b2acfa;

  cursor: pointer;
`;

export const Name = styled.span`
  color: #293845;
  font-weight: 600;
  font-size: 20px;
  margin-top: 10px;
`;

export const Menu = styled.div`
  margin-top: 30px;
  position: relative;
`;
export const Indicator = styled.div<Indicador>`
  transition: top 0.1s;
  width: 5px;
  height: 45px;
  background-color: #6558f5;

  position: absolute;
  top: ${({ index }) => index * 16.7}%;
  margin-left: -10px;
`;
export const MenuItem = styled(Link)<MenuItemsProps>`
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 10px;
  color: ${({ active }) => (active ? "#6558f5" : "#293845")};
  cursor: pointer;
  font-weight: 500;

  & .icon {
    font-size: 25px;
    margin-right: 10px;
    color: ${({ active }) => (active ? "#6558f5" : "#4b5c6b")};
  }
`;

export const InputLine = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 40px;
  align-items: center;
  padding: 0 10px;
`;

export const Label = styled.label`
  text-align: center;

  &.label-top {
    font-size: 15px;
    color: #788896;
  }
`;

export const PlusCircleIcon = styled(FiPlusCircle)`
  font-size: 20px;
  margin-right: 3px;
`;
