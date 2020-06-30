import { Card } from "antd";
import React, { useContext, useEffect } from "react";
import { BreadcrumbsContext } from "../../context/breadcrumbs.context";

export function DashboardContent(): React.ReactElement {
  const breadcumbsContext = useContext(BreadcrumbsContext);

  useEffect(() => {
    breadcumbsContext.setBreadcrumbs([]);
  }, []);

  return <Card bordered={false}>Dashboard</Card>;
}
