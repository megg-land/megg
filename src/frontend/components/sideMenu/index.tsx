import React, { useContext } from "react";
import { Button, Layout } from "antd";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../context";

const { Sider } = Layout;

export default function SideMenu(): React.ReactElement {
  const history = useHistory();
  const authContext = useContext(AuthContext);

  function lock(): void {
    authContext.setIsAuthenticated(false);
    history.push("/");
  }

  return (
    <Sider hidden={!authContext.isAuthenticated}>
      <Button onClick={lock}>Lock App!</Button>
    </Sider>
  );
}
