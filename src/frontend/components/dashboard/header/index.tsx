import "./index.css";
import React from "react";
import { Layout } from "antd";
import { GithubOutlined, MenuFoldOutlined, MenuUnfoldOutlined, QuestionCircleOutlined } from "@ant-design/icons/lib";

interface Props {
  isCollapsed: boolean;
  toggleIsCollapsed(): void;
}

export default function Header(props: Props): React.ReactElement {
  return (
    <Layout.Header className="dashboard-header">
      <div>
        {props.isCollapsed ? (
          <MenuUnfoldOutlined onClick={props.toggleIsCollapsed} className="dashboard-header-collapse-icon" />
        ) : (
          <MenuFoldOutlined onClick={props.toggleIsCollapsed} className="dashboard-header-collapse-icon" />
        )}
      </div>
      <div className="dashboard-header-icon-size">
        <GithubOutlined className="dashboard-header-icon-margin" />
        <QuestionCircleOutlined />
      </div>
    </Layout.Header>
  );
}
