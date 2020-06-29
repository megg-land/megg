import React, { useState } from "react";
import { Layout } from "antd";
import Header from "../../components/dashboard/header";
import SideMenu from "../../components/dashboard/sideMenu";
import Content from "../../components/dashboard/content";
import SelectedCredential from "../../components/dashboard/selectedCredential";

export default function Dashboard(): React.ReactElement {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  function toggleIsCollapsed(): void {
    setIsCollapsed(!isCollapsed);
  }

  return (
    <Layout className="height100">
      <SideMenu isCollapsed={isCollapsed}>
        <SelectedCredential />
      </SideMenu>
      <Layout>
        <Header isCollapsed={isCollapsed} toggleIsCollapsed={toggleIsCollapsed} />
        <Content />
      </Layout>
    </Layout>
  );
}
