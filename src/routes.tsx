import React from "react";
import { BrowserRouter, Switch, Route, useHistory } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ManageUsers from "./pages/ManageUsers";
import CurrentStock from "./pages/CurrentStock";
import SoManagement from "./pages/SoManagement";
import Sidebar from "./components/Sidebar";
import Print from "./pages/Print";

const Routes: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Sidebar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/entrar" component={Login} />
          <Route path="/cadastrar" component={Register} />
          <Route path="/gerenciar-usuarios" component={ManageUsers} />
          <Route exact path="/estoque-atual" component={CurrentStock} />
          <Route exact path="/gestao-de-os" component={SoManagement} />
          <Route exact path="/print/:id" component={Print} />
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default Routes;
