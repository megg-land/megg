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
import { CloudCredentials } from "../../../pages/cloudCredentials";

export default function Content(): React.ReactElement {
  const [breadcrumbs, setBreadcrumbs] = useState<Array<ReactNode>>([]);

  return (
    <BreadcrumbsContext.Provider value={{ breadcrumbs: breadcrumbs, setBreadcrumbs: setBreadcrumbs }}>
      <Layout.Content className="dashboard-content">
        <Breadcrumbs />
        <Route exact path="/dashboard/cloud-credentials/gcloud">
          <GCLOUD />
        </Route>
        <Route exact path="/dashboard/cloud-credentials/aws">
          <AWS />
        </Route>
        <Route exact path="/dashboard/bills">
          <Bills />
        </Route>
        <Route exact path="/dashboard/cloud-credentials">
          <CloudCredentials />
        </Route>
        <Route exact path="/dashboard">
          <DashboardContent />
        </Route>
      </Layout.Content>
    </BreadcrumbsContext.Provider>
  );
}
