import "./index.css";
import React, { ReactNode, useState } from "react";
import { Route } from "react-router-dom";
import { Layout } from "antd";
import Breadcrumbs from "../breadcrumb";
import { BreadcrumbsContext } from "../../../context/breadcrumbs.context";
import { AWS } from "../../../pages/aws";
import { GCLOUD } from "../../../pages/gcloud";
import { Bills } from "../../../pages/bills";
import { DashboardContent } from "../../../pages/dashboardContent";

export default function Content(): React.ReactElement {
  const [breadcrumbs, setBreadcrumbs] = useState<Array<ReactNode>>([]);

  return (
    <BreadcrumbsContext.Provider value={{ breadcrumbs: breadcrumbs, setBreadcrumbs: setBreadcrumbs }}>
      <Layout.Content className="dashboard-content">
        <Breadcrumbs />
        <Route path="/dashboard/gcloud">
          <GCLOUD />
        </Route>
        <Route path="/dashboard/aws">
          <AWS />
        </Route>
        <Route path="/dashboard/bills">
          <Bills />
        </Route>
        <Route exact path="/dashboard">
          <DashboardContent />
        </Route>
      </Layout.Content>
    </BreadcrumbsContext.Provider>
  );
}
