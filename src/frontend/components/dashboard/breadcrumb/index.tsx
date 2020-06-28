import "./index.css";
import React, { SyntheticEvent, useContext } from "react";
import { Breadcrumb } from "antd";
import { DashboardOutlined } from "@ant-design/icons/lib";
import { useHistory } from "react-router-dom";
import { BreadcumbsContext } from "../../../context/breadcrumbs.context";

export default function Breadcrumbs(): React.ReactElement {
  const history = useHistory();
  const breadcumbsContext = useContext(BreadcumbsContext);

  return (
    <Breadcrumb className="breadcrumb-margin-bottom">
      <Breadcrumb.Item
        href=""
        onClick={(event: SyntheticEvent): void => {
          event.preventDefault();
          history.push("/dashboard");
        }}
      >
        <DashboardOutlined />
        <span>Dashboard</span>
      </Breadcrumb.Item>
      {...breadcumbsContext.breadcrumbs}
    </Breadcrumb>
  );
}
