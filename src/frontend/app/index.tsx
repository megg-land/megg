import { hot } from "react-hot-loader";
import React, { ReactNode } from "react";
import { Button, Layout } from "antd";
import { ChannelEnum } from "../../shared/enums/channel.enum";
import { CloudProviderEnum } from "../../shared/enums/cloud-provider.enum";
import { isProd } from "../../shared/constants";

const { api } = window;

async function login(): Promise<void> {
  try {
    await api.invoke(ChannelEnum.LOGIN, "123456");
  } catch (e) {
    console.log(e);
  }
}

async function createAccount(): Promise<void> {
  try {
    await api.invoke(ChannelEnum.CREATE_ACCOUNT, "123456", "123456");
  } catch (e) {
    console.log(e);
  }
}

async function saveCredentials(): Promise<void> {
  try {
    const result = await api.invoke(ChannelEnum.SAVE_CREDENTIAL, {
      service: CloudProviderEnum.GCLOUD,
      account: "account",
      password: "password",
    });
    console.log(result);
  } catch (e) {
    console.log(e);
  }
}

class App extends React.Component {
  render(): ReactNode {
    return (
      <Layout className="layout">
        <div>
          <Button type="primary" onClick={login}>
            Login
          </Button>
          <Button type="primary" onClick={createAccount}>
            Create Account
          </Button>
          <Button type="primary" onClick={saveCredentials}>
            Save Credentials
          </Button>
        </div>
      </Layout>
    );
  }
}

export default isProd ? App : hot(module)(App);
