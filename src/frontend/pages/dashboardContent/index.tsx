import { Card } from "antd";
import React, { useContext, useEffect } from "react";
import { BreadcumbsContext } from "../../context/breadcrumbs.context";

export function DashboardContent(): React.ReactElement {
  const breadcumbsContext = useContext(BreadcumbsContext);

  useEffect(() => {
    breadcumbsContext.setBreadcrumbs([]);
  }, []);

  return <Card bordered={false}>Dashboard</Card>;
}
