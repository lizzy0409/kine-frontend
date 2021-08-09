import React, { createContext } from "react";
import usePersistedState from "../utils/usePersistedState";

interface SidebarData {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  activePage: number;
  setActivePage: React.Dispatch<React.SetStateAction<number>>;
}

export const SideBarContext = createContext({} as SidebarData);

const SideBarProvider: React.FC = ({ children }) => {
  const [open, setOpen] = usePersistedState("sidebarOpen", false);
  const [activePage, setActivePage] = usePersistedState("activePage", 0);

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
