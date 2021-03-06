import "./index.css";
import React, { useEffect } from "react";
import QueueAnim from "rc-queue-anim";
import { Store } from "antd/lib/form/interface";
import CentralizedCard from "../../components/cantralizedCard";
import { Link, useHistory } from "react-router-dom";
import { LockOutlined, LoginOutlined } from "@ant-design/icons/lib";
import { ChannelEnum } from "../../../shared/enums/channel.enum";
import { Button, Form, Input, notification, Typography } from "antd";

const { api } = window;
const { Text } = Typography;

export default function Login(): React.ReactElement {
  const history = useHistory();

  useEffect(() => {
    if (window.sessionStorage.getItem("newAccountCreated")) {
      window.sessionStorage.removeItem("newAccountCreated");
      notification.success({
        message: "Account Created!",
        placement: "topRight",
      });
    }
  });

  function openNotification(): void {
    notification.destroy();

    notification.error({
      message: "Invalid Password!",
      placement: "topRight",
    });
  }

  async function onFinish(form: Store): Promise<void> {
    if (await api.invoke(ChannelEnum.LOG_IN, form.password)) {
      notification.destroy();
      history.push("/dashboard");
    } else {
      openNotification();
    }
  }

  return (
    <CentralizedCard cardClass={""} iconCover={<LockOutlined className="card-icon" />}>
      <Form key="form" onFinish={onFinish}>
        <QueueAnim>
          <Form.Item key="formItemDescriptiveText">
            <Text>Your dashboard is locked. Verify your password to log in.</Text>
          </Form.Item>
        </QueueAnim>

        <QueueAnim>
          <Form.Item
            key="formItemPasswordInput"
            name="password"
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
          <Form.Item key="formItemLoginButton">
            <Button key="loginButton" type="primary" htmlType="submit" block={true} icon={<LoginOutlined />}>
              Log In
            </Button>
          </Form.Item>
        </QueueAnim>

        <QueueAnim>
          <div key="links" className="login-links">
            <Link to="/forgotPassword">Forgot Password</Link>
            {/*// TODO Fix need help link*/}
            <Link to="/accountCreation">Need Help</Link>
          </div>
        </QueueAnim>
      </Form>
    </CentralizedCard>
  );
}
