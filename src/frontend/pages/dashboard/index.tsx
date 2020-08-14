import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import Header from "../../components/dashboard/header";
import SideMenu from "../../components/dashboard/sideMenu";
import Content from "../../components/dashboard/content";
import SelectedCredential from "../../components/dashboard/selectedCredential";
import { SideMenuContext } from "../../context/sideMenu.context";
import { CredentialModel } from "../../../shared/models/credential.model";
import { SelectedCredentialContext } from "../../context/selectedCredential.context";
import { ChannelEnum } from "../../../shared/enums/channel.enum";
import { CredentialsContext } from "../../context/credentials.context";

const { api } = window;

export default function Dashboard(): React.ReactElement {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [selectedKeys, setSelectedKeys] = useState<string[]>(["1"]);
  const [credential, setCredential] = useState<CredentialModel | null>(null);
  const [credentials, setCredentials] = useState<CredentialModel[] | null>([]);

  async function loadCredentials(): Promise<void> {
    const credentials = (await api.invoke(ChannelEnum.GET_ALL_CREDENTIALS)) as CredentialModel[] | null;

    if (credentials) {
      setCredentials(credentials);
      setCredential(credentials.find(c => c.favorite));
    }
  }

  function toggleIsCollapsed(): void {
    setIsCollapsed(!isCollapsed);
  }

  useEffect(() => {
    loadCredentials();
  }, []);

  return (
    <Layout className="height100">
      <CredentialsContext.Provider value={{ credentials: credentials, setCredentials: setCredentials }}>
        <SelectedCredentialContext.Provider value={{ credential: credential, setCredential: setCredential }}>
          <SideMenuContext.Provider value={{ selectedKeys: selectedKeys, setSelectedKeys: setSelectedKeys }}>
            <SideMenu isCollapsed={isCollapsed}>
              <SelectedCredential isCollapsed={isCollapsed} />
            </SideMenu>
            <Layout>
              <Header isCollapsed={isCollapsed} toggleIsCollapsed={toggleIsCollapsed} />
              <Content />
            </Layout>
          </SideMenuContext.Provider>
        </SelectedCredentialContext.Provider>
      </CredentialsContext.Provider>
    </Layout>
  );
}
