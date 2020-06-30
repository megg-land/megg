import "./index.css";
import React, { SyntheticEvent, useContext } from "react";
import { Breadcrumb } from "antd";
import { DashboardOutlined } from "@ant-design/icons/lib";
import { useHistory } from "react-router-dom";
import { BreadcrumbsContext } from "../../../context/breadcrumbs.context";
import { SideMenuContext } from "../../../context/sideMenu.context";

export default function Breadcrumbs(): React.ReactElement {
  const history = useHistory();
  const breadcrumbsContext = useContext(BreadcrumbsContext);
  const sideMenuContext = useContext(SideMenuContext);

  function getDashboardBreadcrumbs(): React.ReactElement {
    if (breadcrumbsContext.breadcrumbs.length > 0) {
      return (
        <Breadcrumb.Item
          href=""
          onClick={(event: SyntheticEvent): void => {
            event.preventDefault();
            sideMenuContext.setSelectedKeys(["1"]);
            history.push("/dashboard");
          }}
        >
          <DashboardOutlined />
          <span>Dashboard</span>
        </Breadcrumb.Item>
      );
    }

    return (
      <Breadcrumb.Item>
        <DashboardOutlined />
        <span>Dashboard</span>
      </Breadcrumb.Item>
    );
  }

  return (
    <Breadcrumb className="breadcrumb-margin-bottom">
      {getDashboardBreadcrumbs()}
      {...breadcrumbsContext.breadcrumbs}
    </Breadcrumb>
  );
}
