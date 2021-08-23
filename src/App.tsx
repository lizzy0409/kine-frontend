import React from "react";
import GlobalStyle from "./styles/GlobalStyle";

import Routes from "./routes";
import SideBarProvider from "./contexts/SideBarContext";
import AuthProvider from "./contexts/AuthContext";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <SideBarProvider>
        <Routes />
        <GlobalStyle />
      </SideBarProvider>
    </AuthProvider>
  );
};

export default App;
