import React, { useState } from "react";
import { Layout } from "antd";
import Header from "../../components/dashboard/header";
import SideMenu from "../../components/dashboard/sideMenu";
import Content from "../../components/dashboard/content";
import SelectedCredential from "../../components/dashboard/selectedCredential";
import { SideMenuContext } from "../../context/sideMenu.context";

export default function Dashboard(): React.ReactElement {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [selectedKeys, setSelectedKeys] = useState<string[]>(["1"]);

  function toggleIsCollapsed(): void {
    setIsCollapsed(!isCollapsed);
  }

  return (
    <Layout className="height100">
      <SideMenuContext.Provider value={{ selectedKeys: selectedKeys, setSelectedKeys: setSelectedKeys }}>
        <SideMenu isCollapsed={isCollapsed}>
          <SelectedCredential />
        </SideMenu>
        <Layout>
          <Header isCollapsed={isCollapsed} toggleIsCollapsed={toggleIsCollapsed} />
          <Content />
        </Layout>
      </SideMenuContext.Provider>
    </Layout>
  );
}
