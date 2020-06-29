import { Breadcrumb, Card } from "antd";
import React, { useContext, useEffect } from "react";
import { BreadcumbsContext } from "../../context/breadcrumbs.context";
import { CloudOutlined, GoogleOutlined } from "@ant-design/icons/lib";

export function GCLOUD(): React.ReactElement {
  const breadcumbsContext = useContext(BreadcumbsContext);

  useEffect(() => {
    breadcumbsContext.setBreadcrumbs([
      <Breadcrumb.Item key="cloudCredentials">
        <CloudOutlined />
        <span>Cloud Credentials</span>
      </Breadcrumb.Item>,
      <Breadcrumb.Item key="gcloud">
        <GoogleOutlined />
        <span>GCLOUD</span>
      </Breadcrumb.Item>,
    ]);
  }, []);

  return <Card bordered={false}>GCLOUD</Card>;
}
