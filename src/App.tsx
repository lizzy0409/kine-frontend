import React from "react";
import GlobalStyle from "./styles/GlobalStyle";

import Routes from "./routes";
import SideBarProvider from "./contexts/SideBarContext";

const App: React.FC = () => {
  return (
    <SideBarProvider>
      <Routes />
      <GlobalStyle />
    </SideBarProvider>
  );
};

export default App;
