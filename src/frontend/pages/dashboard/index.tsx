import React, { useState } from "react";
import { Layout } from "antd";
import Header from "../../components/dashboard/header";
import SideMenu from "../../components/dashboard/sideMenu";
import Content from "../../components/dashboard/content";
import FavoriteCredential from "../../components/dashboard/favoriteCredential";
import { SideMenuContext } from "../../context/sideMenu.context";
import { CredentialModel } from "../../../shared/models/credential.model";
import { FavoriteContext } from "../../context/favorite.context";

export default function Dashboard(): React.ReactElement {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [selectedKeys, setSelectedKeys] = useState<string[]>(["1"]);
  const [favorite, setFavorite] = useState<CredentialModel | null>(null);

  function toggleIsCollapsed(): void {
    setIsCollapsed(!isCollapsed);
  }

  return (
    <Layout className="height100">
      <FavoriteContext.Provider value={{ favorite: favorite, setFavorite: setFavorite }}>
        <SideMenuContext.Provider value={{ selectedKeys: selectedKeys, setSelectedKeys: setSelectedKeys }}>
          <SideMenu isCollapsed={isCollapsed}>
            <FavoriteCredential isCollapsed={isCollapsed} />
          </SideMenu>
          <Layout>
            <Header isCollapsed={isCollapsed} toggleIsCollapsed={toggleIsCollapsed} />
            <Content />
          </Layout>
        </SideMenuContext.Provider>
      </FavoriteContext.Provider>
    </Layout>
  );
}
