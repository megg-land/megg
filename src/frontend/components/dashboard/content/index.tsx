import "./index.css";
import React, { ReactNode, useState } from "react";
import { Route } from "react-router-dom";
import { Card, Layout } from "antd";
import Breadcrumbs from "../breadcrumb";
import { BreadcumbsContext } from "../../../context/breadcrumbs.context";
import { Aws } from "../../../pages/aws";

export default function Content(): React.ReactElement {
  const [breadcrumbs, setBreadcrumbs] = useState<Array<ReactNode>>([]);

  return (
    <BreadcumbsContext.Provider value={{ breadcrumbs: breadcrumbs, setBreadcrumbs: setBreadcrumbs }}>
      <Layout.Content className="dashboard-content">
        <Breadcrumbs />
        <Route path="/dashboard/gcloud">
          <Card bordered={false}>GCLOUD</Card>
        </Route>
        <Route path="/dashboard/aws">
          <Aws />
        </Route>
        <Route path="/dashboard/bills">
          <Card bordered={false}>Bills</Card>
        </Route>
        <Route exact path="/dashboard">
          <Card bordered={false}>Dashboard</Card>
        </Route>
      </Layout.Content>
    </BreadcumbsContext.Provider>
  );
}
