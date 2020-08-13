import "./index.css";
import React, { useContext } from "react";
import { SelectedCredentialContext } from "../../../context/selectedCredential.context";
import { AmazonOutlined, DownOutlined, WarningOutlined } from "@ant-design/icons/lib";
import { CloudProviderEnum } from "../../../../shared/enums/cloud-provider.enum";
import { Dropdown, Menu } from "antd";
import { CredentialsContext } from "../../../context/credentials.context";

interface Props {
  isCollapsed: boolean;
}

export default function SelectedCredential(props: Props): React.ReactElement {
  const credentialsContext = useContext(CredentialsContext);
  const selectedCredentialContext = useContext(SelectedCredentialContext);

  function noCredential(): React.ReactElement {
    if (props.isCollapsed) {
      return <WarningOutlined style={{ fontSize: 24 }} id="collapsed" />;
    }

    return (
      <div style={{ paddingLeft: 14 }}>
        <Dropdown overlay={menu}>
          <div>
            <WarningOutlined style={{ fontSize: 24 }} />
            <span style={{ marginLeft: 5, fontSize: 18 }}>No Credentials</span>
          </div>
        </Dropdown>
      </div>
    );
  }

  const menu = (
    <Menu>
      {credentialsContext.credentials.map(credential => {
        return (
          <Menu.Item key={credential.id} onClick={() => selectedCredentialContext.setCredential(credential)}>
            <AmazonOutlined />
            <span>{credential.account}</span>
          </Menu.Item>
        );
      })}
    </Menu>
  );

  function getAwsCredential(): React.ReactElement {
    if (props.isCollapsed) {
      return <AmazonOutlined style={{ fontSize: 24 }} id="collapsed" />;
    }

    return (
      <div style={{ paddingLeft: 14 }}>
        <Dropdown overlay={menu}>
          <div>
            <AmazonOutlined style={{ fontSize: 24 }} />
            <span style={{ marginLeft: 5, fontSize: 18 }}>{selectedCredentialContext.credential?.account}</span>
            <DownOutlined style={{ marginLeft: 6, fontSize: 14 }} />
          </div>
        </Dropdown>
      </div>
    );
  }

  function getSelectedCredential(): React.ReactElement {
    if (selectedCredentialContext.credential) {
      if (selectedCredentialContext.credential.cloudProvider === CloudProviderEnum.AWS) {
        return getAwsCredential();
      }
    }

    return noCredential();
  }

  return <div className="favorite-credential">{getSelectedCredential()}</div>;
}
