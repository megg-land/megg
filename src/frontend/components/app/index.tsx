import React from "react";
import { Layout } from "antd";
import { HashRouter, Route, Switch } from "react-router-dom";
import { isProd } from "../../../shared/constants";
import { hot } from "react-hot-loader";
import ForgotPassword from "../../pages/forgotPassword";
import AccountCreation from "../../pages/accountCreation";
import Login from "../../pages/login";
import Landing from "../../pages/landing";
import Dashboard from "../../pages/dashboard";
import "./index.css";

const { Content } = Layout;

function App(): React.ReactElement {
  return (
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
            <Route path="/login">
              <Login />
            </Route>
            <Route exact path="/">
              <Landing />
            </Route>
          </Switch>
        </Content>
      </HashRouter>
    </Layout>
  );
}

export default isProd ? App : hot(module)(App);
