import "./index.css";
import React, { CSSProperties, useContext } from "react";
import { SelectedCredentialContext } from "../../../context/selectedCredential.context";
import { AmazonOutlined, GoogleOutlined, WarningOutlined } from "@ant-design/icons/lib";
import { CloudProviderEnum } from "../../../../shared/enums/cloud-provider.enum";
import { Select } from "antd";
import { CredentialsContext } from "../../../context/credentials.context";

interface Props {
  isCollapsed: boolean;
}

export default function SelectedCredential(props: Props): React.ReactElement {
  const credentialsContext = useContext(CredentialsContext);
  const selectedCredentialContext = useContext(SelectedCredentialContext);

  function getCredentialIcon(style: CSSProperties): React.ReactElement {
    if (selectedCredentialContext?.credential?.cloudProvider) {
      if (selectedCredentialContext.credential.cloudProvider === CloudProviderEnum.AWS) {
        return <AmazonOutlined style={style} />;
      }

      if (selectedCredentialContext.credential.cloudProvider === CloudProviderEnum.GCLOUD) {
        return <GoogleOutlined style={style} />;
      }
    }

    return <WarningOutlined style={style} />;
  }

  function getSelectedCredential(): React.ReactElement {
    if (props.isCollapsed) {
      return getCredentialIcon({ fontSize: 24 });
    }

    return (
      <div className="selected-credential-left-padding14 selected-credential-right-padding14">
        <Select
          value={selectedCredentialContext?.credential?.id}
          defaultValue={selectedCredentialContext?.credential?.account}
          className="width100"
          placeholder={
            <div>
              {getCredentialIcon(null)}
              <span className="selected-credential-left-padding5">No Credentials!</span>
            </div>
          }
          onChange={value => {
            selectedCredentialContext.setCredential(
              credentialsContext.credentials.find(credential => credential.id === value),
            );
          }}
        >
          {credentialsContext.credentials.map(credential => {
            return (
              <Select.Option key={credential.id} value={credential.id}>
                {getCredentialIcon(null)}
                <span className="selected-credential-left-padding5">{credential.account}</span>
              </Select.Option>
            );
          })}
        </Select>
      </div>
    );
  }

  return <div className="selected-credential">{getSelectedCredential()}</div>;
}
