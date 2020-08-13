import "./index.css";
import { Breadcrumb, Card, Col, Divider, Layout, Modal, notification, Row, Table } from "antd";
import React, { useContext, useEffect, useRef, useState } from "react";
import { BreadcrumbsContext } from "../../context/breadcrumbs.context";
import { AmazonOutlined, CloudOutlined, DeleteOutlined, StarOutlined, WarningOutlined } from "@ant-design/icons/lib";
import { ChannelEnum } from "../../../shared/enums/channel.enum";
import { useHistory } from "react-router-dom";
import { SelectedCredentialContext } from "../../context/selectedCredential.context";
import { CredentialsContext } from "../../context/credentials.context";
import { CredentialModel } from "../../../shared/models/credential.model";

const { api } = window;

export function CloudCredentials(): React.ReactElement {
  const history = useHistory();
  const [credentials, setCredentials] = useState([]);
  const breadcrumbsContext = useRef(useContext(BreadcrumbsContext));
  const credentialsContext = useContext(CredentialsContext);
  const selectedCredentialContext = useContext(SelectedCredentialContext);

  async function loadCredentials(): Promise<void> {
    setCredentials((await api.invoke(ChannelEnum.GET_ALL_CREDENTIALS)) as []);
  }

  useEffect(() => {
    if (window.sessionStorage.getItem("newCredentialCreated")) {
      window.sessionStorage.removeItem("newCredentialCreated");
      notification.success({
        message: "Cloud Credential Created!",
        placement: "topRight",
      });
    }

    loadCredentials();

    breadcrumbsContext.current.setBreadcrumbs([
      <Breadcrumb.Item key="cloudCredentials">
        <CloudOutlined />
        <span>Cloud Credentials</span>
      </Breadcrumb.Item>,
    ]);
  }, []);

  return (
    <Layout>
      <Table
        columns={[
          {
            title: "Cloud Provider",
            dataIndex: "cloudProvider",
          },
          {
            title: "Account",
            dataIndex: "account",
            ellipsis: true,
          },
          {
            title: "Favorite",
            align: "center",
            render: (record): React.ReactElement => (
              <StarOutlined
                style={{ color: `${record.favorite ? "yellow" : ""}` }}
                onClick={async (): Promise<void> => {
                  if (!record.favorite) {
                    await api.invoke(ChannelEnum.SET_FAVORITE, record.id);
                    setCredentials((await api.invoke(ChannelEnum.GET_ALL_CREDENTIALS)) as []);
                    credentialsContext.setCredentials(credentials);
                  }
                }}
              />
            ),
          },
          {
            title: "Action",
            align: "center",
            render: (text, record): React.ReactElement => (
              <DeleteOutlined
                className="highlight-hover"
                onClick={(): void => {
                  Modal.confirm({
                    title: "Are you sure you want to delete this cloud credential?",
                    icon: <WarningOutlined />,
                    content: "Deleting this credential will not delete the servers",
                    okText: "Yes",
                    okType: "danger",
                    cancelText: "No",
                    onOk: async () => {
                      if (await api.invoke(ChannelEnum.DELETE_CREDENTIAL, record.id)) {
                        notification.success({
                          message: "Cloud Credential Deleted!",
                          placement: "topRight",
                        });
                        const loadedCredentials = (await api.invoke(
                          ChannelEnum.GET_ALL_CREDENTIALS,
                        )) as CredentialModel[];
                        setCredentials(loadedCredentials);
                        credentialsContext.setCredentials(loadedCredentials);
                        if (record.id === selectedCredentialContext.credential.id) {
                          selectedCredentialContext.setCredential(loadedCredentials[0]);
                        }
                      } else {
                        notification.error({
                          message: "Error Deleting Credential!",
                          placement: "topRight",
                        });
                      }
                    },
                  });
                }}
              />
            ),
          },
        ]}
        dataSource={credentials}
        rowKey="id"
        pagination={false}
      />
      <Divider>Add Credentials</Divider>
      <Row gutter={[24, 16]} justify="center">
        <Col>
          <Card
            hoverable={true}
            onClick={(): void => {
              history.push("/dashboard/cloud-credentials/aws");
            }}
            className="cloud-credential-card"
          >
            <AmazonOutlined className="cloud-credential-card-icon" />
          </Card>
        </Col>
      </Row>
    </Layout>
  );
}
