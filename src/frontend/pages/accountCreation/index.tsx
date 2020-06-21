import React from "react";
import { Button, Form, Input, Typography } from "antd";
import { Link, useHistory } from "react-router-dom";
import QueueAnim from "rc-queue-anim";
import { UserAddOutlined } from "@ant-design/icons/lib";
import CentralizedCard from "../../components/cantralizedCard";
import { Store, StoreValue } from "antd/lib/form/interface";
import { ChannelEnum } from "../../../shared/enums/channel.enum";
import { RuleObject } from "antd/lib/form/index";

const { api } = window;
const { Text } = Typography;

export default function AccountCreation(): React.ReactElement {
  const history = useHistory();

  async function onFinish(form: Store): Promise<void> {
    if (await api.invoke(ChannelEnum.CREATE_ACCOUNT, form)) {
      window.sessionStorage.setItem("newAccountCreated", "true");
      history.push("/unlock");
    }
  }

  return (
    <CentralizedCard cardClass={"card-class-create-account"} iconCover={<UserAddOutlined className="card-icon" />}>
      <Form key="form" onFinish={onFinish}>
        <QueueAnim>
          <Form.Item key="formItemDescriptiveText">
            <Text>Create a new account.</Text>
          </Form.Item>
        </QueueAnim>

        <QueueAnim>
          <Form.Item
            key="formItemAccountInput"
            name="username"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please input your account name",
              },
            ]}
          >
            <Input maxLength={126} placeholder="Username" />
          </Form.Item>
        </QueueAnim>

        <QueueAnim>
          <Form.Item
            key="formItemPasswordInput"
            name="password"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please input your password",
              },
            ]}
          >
            <Input.Password maxLength={126} placeholder="Password" />
          </Form.Item>
        </QueueAnim>

        <QueueAnim>
          <Form.Item
            key="formItemPasswordConfirmationInput"
            name="passwordConfirm"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password",
              },
              ({ getFieldValue }): RuleObject => ({
                validator(rule: RuleObject, value: StoreValue): Promise<void> {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject("The two passwords do not match");
                },
              }),
            ]}
          >
            <Input.Password maxLength={126} placeholder="Confirm Password" />
          </Form.Item>
        </QueueAnim>

        <QueueAnim>
          <Form.Item key="formItemCreateButton">
            <Button key="createButton" type="primary" htmlType="submit" block={true} icon={<UserAddOutlined />}>
              Create
            </Button>
          </Form.Item>
        </QueueAnim>

        <QueueAnim>
          <div key="links" className="unlock-links">
            <Link to="/unlock">Already Have an Account?</Link>
          </div>
        </QueueAnim>
      </Form>
    </CentralizedCard>
  );
}
