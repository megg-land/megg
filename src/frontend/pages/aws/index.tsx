import "./index.css";
import { Breadcrumb, Button, Card, Checkbox, Form, Input, Layout, notification, Select, Tooltip } from "antd";
import React, { SyntheticEvent, useContext, useEffect, useRef } from "react";
import { BreadcrumbsContext } from "../../context/breadcrumbs.context";
import { AmazonOutlined, CheckCircleOutlined, CloseCircleOutlined, CloudOutlined } from "@ant-design/icons/lib";
import { useHistory } from "react-router-dom";
import QueueAnim from "rc-queue-anim";
import { Store } from "antd/lib/form/interface";
import { ChannelEnum } from "../../../shared/enums/channel.enum";
import { CloudProviderEnum } from "../../../shared/enums/cloud-provider.enum";
import { CredentialsContext } from "../../context/credentials.context";
import { SelectedCredentialContext } from "../../context/selectedCredential.context";
import { CredentialModel } from "../../../shared/models/credential.model";

const { api } = window;

export function AWS(): React.ReactElement {
  const history = useRef(useHistory());
  const breadcrumbsContext = useRef(useContext(BreadcrumbsContext));
  const credentialsContext = useContext(CredentialsContext);
  const selectedCredentialContext = useContext(SelectedCredentialContext);

  function openNotification(): void {
    notification.destroy();

    notification.error({
      message: "Invalid Credentials!",
      placement: "topRight",
    });
  }

  async function onFinish(form: Store): Promise<void> {
    if (
      await api.invoke(ChannelEnum.SAVE_CREDENTIAL, {
        cloudProvider: CloudProviderEnum.AWS,
        favorite: form.favorite,
        account: form.accessKeyId,
        password: form.accessKeySecret,
      })
    ) {
      const credentials = (await api.invoke(ChannelEnum.GET_ALL_CREDENTIALS)) as CredentialModel[];
      credentialsContext.setCredentials(credentials);

      if (!selectedCredentialContext.credential) {
        selectedCredentialContext.setCredential(credentials[0]);
      }

      notification.destroy();
      window.sessionStorage.setItem("newCredentialCreated", "true");
      history.current.push("/dashboard/cloud-credentials");
    } else {
      openNotification();
    }
  }

  useEffect(() => {
    breadcrumbsContext.current.setBreadcrumbs([
      <Breadcrumb.Item
        key="cloudCredentials"
        href=""
        onClick={(event: SyntheticEvent): void => {
          event.preventDefault();
          history.current.push("/dashboard/cloud-credentials");
        }}
      >
        <CloudOutlined />
        <span>Cloud Credentials</span>
      </Breadcrumb.Item>,
      <Breadcrumb.Item key="aws">
        <AmazonOutlined />
        <span>AWS</span>
      </Breadcrumb.Item>,
    ]);
  }, []);

  // TODO fix url
  return (
    <Form key="form" onFinish={onFinish}>
      <Layout>
        <Card bordered={false} headStyle={{ textAlign: "center" }} title="Cloud Credential AWS">
          <QueueAnim>
            <Form.Item
              name="accessKeyId"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please input your access key id",
                },
              ]}
            >
              <Input maxLength={126} placeholder="Access Key Id" />
            </Form.Item>
          </QueueAnim>

          <QueueAnim>
            <Form.Item
              name="accessKeySecret"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please input your access key secret",
                },
              ]}
            >
              <Input.Password maxLength={126} placeholder="Access Key Secret" />
            </Form.Item>
          </QueueAnim>

          <QueueAnim>
            <Form.Item className="no-margin-bottom">
              <QueueAnim className="aws-select-display">
                <Form.Item initialValue="Access Key" name="credentialType">
                  <Select className="aws-select-min-width">
                    <Select.Option value="Access Key">Access Key</Select.Option>
                    <Select.Option value="IAM">IAM</Select.Option>
                  </Select>
                </Form.Item>
              </QueueAnim>
              <Tooltip title="Useful information">
                <a href="" className="aws-tooltip">
                  Need Help?
                </a>
              </Tooltip>

              <QueueAnim className="aws-favorite">
                <Form.Item initialValue={false} name="favorite" valuePropName="checked">
                  <Checkbox>Favorite</Checkbox>
                </Form.Item>
              </QueueAnim>
            </Form.Item>
          </QueueAnim>

          <QueueAnim className="aws-button-position">
            <Button type="primary" htmlType="submit" icon={<CheckCircleOutlined />}>
              Save
            </Button>
            <Button
              className="aws-button-margin"
              danger
              type="primary"
              icon={<CloseCircleOutlined />}
              onClick={(): void => {
                notification.destroy();
                history.current.push("/dashboard/cloud-credentials");
              }}
            >
              Cancel
            </Button>
          </QueueAnim>
        </Card>
      </Layout>
    </Form>
  );
}
