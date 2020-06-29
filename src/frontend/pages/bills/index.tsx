import { Breadcrumb, Card } from "antd";
import React, { useContext, useEffect } from "react";
import { BreadcumbsContext } from "../../context/breadcrumbs.context";
import { DollarCircleOutlined } from "@ant-design/icons/lib";

export function Bills(): React.ReactElement {
  const breadcumbsContext = useContext(BreadcumbsContext);

  useEffect(() => {
    breadcumbsContext.setBreadcrumbs([
      <Breadcrumb.Item key="bills">
        <DollarCircleOutlined />
        <span>Bills</span>
      </Breadcrumb.Item>,
    ]);
  }, []);

  return <Card bordered={false}>Bills</Card>;
}
