import React from "react";
import GlobalStyle from "./styles/GlobalStyle";

import Routes from "./routes";

const App: React.FC = () => {
  return (
    <>
      <Routes />
      <GlobalStyle />
    </>
  );
};

export default App;
