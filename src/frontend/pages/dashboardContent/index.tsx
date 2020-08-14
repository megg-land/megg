import { Card } from "antd";
import React, { useContext, useEffect, useRef } from "react";
import { BreadcrumbsContext } from "../../context/breadcrumbs.context";

export function DashboardContent(): React.ReactElement {
  const breadcrumbsContext = useRef(useContext(BreadcrumbsContext));

  useEffect(() => {
    breadcrumbsContext.current.setBreadcrumbs([]);
  }, []);

  return <Card bordered={false}>Dashboard</Card>;
}
