import "./index.css";
import React, { ReactNode, useContext } from "react";
import { CloudOutlined, DashboardOutlined, DollarCircleOutlined, LogoutOutlined } from "@ant-design/icons/lib";
import { Layout, Menu } from "antd";
import { useHistory } from "react-router-dom";
import { SideMenuContext } from "../../../context/sideMenu.context";

interface Props {
  children: ReactNode;
  isCollapsed: boolean;
}

export default function SideMenu(props: Props): React.ReactElement {
  const history = useHistory();
  const sideMenuContext = useContext(SideMenuContext);

  return (
    <Layout.Sider collapsible collapsed={props.isCollapsed} trigger={null}>
      {props.children}
      <Menu
        mode="vertical"
        theme="light"
        selectedKeys={sideMenuContext.selectedKeys}
        defaultSelectedKeys={["1"]}
        className="menu-height"
      >
        <Menu.Item
          key="1"
          icon={<DashboardOutlined />}
          className="menu-first-item"
          onClick={(): void => {
            sideMenuContext.setSelectedKeys(["1"]);
            history.push("/dashboard");
          }}
        >
          Dashboard
        </Menu.Item>
        <Menu.Item
          key="2"
          icon={<CloudOutlined />}
          className="menu-first-item"
          onClick={(): void => {
            sideMenuContext.setSelectedKeys(["2"]);
            history.push("/dashboard/cloud-credentials");
          }}
        >
          Cloud Credentials
        </Menu.Item>
        <Menu.Item
          key="3"
          icon={<DollarCircleOutlined />}
          onClick={(): void => {
            sideMenuContext.setSelectedKeys(["3"]);
            history.push("/dashboard/bills");
          }}
        >
          Bills
        </Menu.Item>
        <Menu.Item
          key="4"
          icon={<LogoutOutlined />}
          onClick={(): void => {
            history.push("/login");
          }}
        >
          Log Out
        </Menu.Item>
      </Menu>
    </Layout.Sider>
  );
}
