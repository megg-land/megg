import "./index.css";
import React, { ReactNode, useContext } from "react";
import {
  AmazonOutlined,
  CloudOutlined,
  DashboardOutlined,
  DollarCircleOutlined,
  GoogleOutlined,
  LockOutlined,
} from "@ant-design/icons/lib";
import { Layout, Menu } from "antd";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../../context/auth.context";
import { SideMenuContext } from "../../../context/sideMenu.context";

interface Props {
  children: ReactNode;
  isCollapsed: boolean;
}

export default function SideMenu(props: Props): React.ReactElement {
  const history = useHistory();
  const authContext = useContext(AuthContext);
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
        <Menu.SubMenu key="2" icon={<CloudOutlined />} title="Cloud Credentials">
          <Menu.Item
            key="3"
            icon={<AmazonOutlined />}
            onClick={(): void => {
              sideMenuContext.setSelectedKeys(["3"]);
              history.push("/dashboard/aws");
            }}
          >
            AWS
          </Menu.Item>
          <Menu.Item
            key="4"
            icon={<GoogleOutlined />}
            onClick={(): void => {
              sideMenuContext.setSelectedKeys(["4"]);
              history.push("/dashboard/gcloud");
            }}
          >
            GCLOUD
          </Menu.Item>
        </Menu.SubMenu>
        <Menu.Item
          key="5"
          icon={<DollarCircleOutlined />}
          onClick={(): void => {
            sideMenuContext.setSelectedKeys(["5"]);
            history.push("/dashboard/bills");
          }}
        >
          Bills
        </Menu.Item>
        <Menu.Item
          key="6"
          icon={<LockOutlined />}
          onClick={(): void => {
            authContext.setIsAuthenticated(false);
            history.push("/unlock");
          }}
        >
          Lock
        </Menu.Item>
      </Menu>
    </Layout.Sider>
  );
}
