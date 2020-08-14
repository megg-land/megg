import { Breadcrumb, Card } from "antd";
import React, { useContext, useEffect, useRef } from "react";
import { BreadcrumbsContext } from "../../context/breadcrumbs.context";
import { DollarCircleOutlined } from "@ant-design/icons/lib";

export function Bills(): React.ReactElement {
  const breadcrumbsContext = useRef(useContext(BreadcrumbsContext));

  useEffect(() => {
    breadcrumbsContext.current.setBreadcrumbs([
      <Breadcrumb.Item key="bills">
        <DollarCircleOutlined />
        <span>Bills</span>
      </Breadcrumb.Item>,
    ]);
  }, []);

  return <Card bordered={false}>Bills</Card>;
}
