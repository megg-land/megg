import { Breadcrumb, Card } from "antd";
import React, { SyntheticEvent, useContext, useEffect } from "react";
import { BreadcumbsContext } from "../../context/breadcrumbs.context";
import { DollarCircleOutlined } from "@ant-design/icons/lib";
import { useHistory } from "react-router-dom";

export function Bills(): React.ReactElement {
  const history = useHistory();
  const breadcumbsContext = useContext(BreadcumbsContext);

  useEffect(() => {
    breadcumbsContext.setBreadcrumbs([
      <Breadcrumb.Item
        key="bills"
        href=""
        onClick={(event: SyntheticEvent): void => {
          event.preventDefault();
          history.push("/dashboard/bills");
        }}
      >
        <DollarCircleOutlined />
        <span>Bills</span>
      </Breadcrumb.Item>,
    ]);
  }, []);

  return <Card bordered={false}>Bills</Card>;
}
