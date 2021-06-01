import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ManageUsers from "./pages/ManageUsers";

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/entrar" component={Login} />
        <Route path="/cadastrar" component={Register} />
        <Route path="/gerenciar-usuarios" component={ManageUsers} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
