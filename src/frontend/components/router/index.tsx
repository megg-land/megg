import React from "react";
import { hot } from "react-hot-loader";
import { isProd } from "../../../shared/constants";
import { Route, Switch } from "react-router-dom";
import AccountCreation from "../accountCreation";
import Unlock from "../unlock";
import ForgotPassword from "../forgotPassword";
import QueueAnim from "rc-queue-anim";
import Home from "../home";

function Router(): React.ReactElement {
  return (
    <Switch>
      <Route path="/forgotPassword">
        <QueueAnim type={["right", "left"]}>
          <ForgotPassword />
        </QueueAnim>
      </Route>
      <Route path="/accountCreation">
        <QueueAnim type={["right", "left"]}>
          <AccountCreation />
        </QueueAnim>
      </Route>
      <Route path="/unlock">
        <Unlock />
      </Route>
      <Route exact path="/">
        <Home />
      </Route>
    </Switch>
  );
}

export default isProd ? Router : hot(module)(Router);
