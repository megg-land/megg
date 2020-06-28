import React, { useState } from "react";
import { Layout } from "antd";
import { HashRouter, Route, Switch } from "react-router-dom";
import { isProd } from "../../../shared/constants";
import { hot } from "react-hot-loader";
import ForgotPassword from "../../pages/forgotPassword";
import AccountCreation from "../../pages/accountCreation";
import Unlock from "../../pages/unlock";
import Landing from "../../pages/landing";
import { AuthContext } from "../../context/auth.context";
import Dashboard from "../../pages/dashboard";
import "./index.css";

const { Content } = Layout;

function App(): React.ReactElement {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>();

  return (
    <AuthContext.Provider value={{ isAuthenticated: isAuthenticated, setIsAuthenticated: setIsAuthenticated }}>
      <Layout className="main-layout">
        <HashRouter>
          <Content>
            <Switch>
              <Route path="/dashboard">
                <Dashboard />
              </Route>
              <Route path="/forgotPassword">
                <ForgotPassword />
              </Route>
              <Route path="/accountCreation">
                <AccountCreation />
              </Route>
              <Route path="/unlock">
                <Unlock />
              </Route>
              <Route exact path="/">
                <Landing />
              </Route>
            </Switch>
          </Content>
        </HashRouter>
      </Layout>
    </AuthContext.Provider>
  );
}

export default isProd ? App : hot(module)(App);
