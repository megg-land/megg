import { Card } from "antd";
import React, { useContext, useEffect } from "react";
import { BreadcrumbsContext } from "../../context/breadcrumbs.context";

export function DashboardContent(): React.ReactElement {
  const breadcrumbsContext = useContext(BreadcrumbsContext);

  useEffect(() => {
    breadcrumbsContext.setBreadcrumbs([]);
  }, []);

  return <Card bordered={false}>Dashboard</Card>;
}
