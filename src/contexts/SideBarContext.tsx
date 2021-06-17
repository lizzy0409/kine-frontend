import React, { createContext, useState } from "react";

interface SidebarData {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  activePage: number;
  setActivePage: React.Dispatch<React.SetStateAction<number>>;
}

export const SideBarContext = createContext({} as SidebarData);

const SideBarProvider: React.FC = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [activePage, setActivePage] = useState(0);

  return (
    <SideBarContext.Provider
      value={{
        open,
        setOpen,
        activePage,
        setActivePage,
      }}
    >
      {children}
    </SideBarContext.Provider>
  );
};

export default SideBarProvider;
