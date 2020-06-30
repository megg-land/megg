import { Breadcrumb, Card } from "antd";
import React, { useContext, useEffect } from "react";
import { BreadcrumbsContext } from "../../context/breadcrumbs.context";
import { AmazonOutlined, CloudOutlined } from "@ant-design/icons/lib";

export function AWS(): React.ReactElement {
  const breadcumbsContext = useContext(BreadcrumbsContext);

  useEffect(() => {
    breadcumbsContext.setBreadcrumbs([
      <Breadcrumb.Item key="cloudCredentials">
        <CloudOutlined />
        <span>Cloud Credentials</span>
      </Breadcrumb.Item>,
      <Breadcrumb.Item key="aws">
        <AmazonOutlined />
        <span>AWS</span>
      </Breadcrumb.Item>,
    ]);
  }, []);

  return <Card bordered={false}>AWS</Card>;
}
