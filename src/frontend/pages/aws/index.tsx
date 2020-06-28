import "./index.css";
import { Breadcrumb, Card } from "antd";
import React, { SyntheticEvent, useContext, useEffect } from "react";
import { BreadcumbsContext } from "../../context/breadcrumbs.context";
import { AmazonOutlined } from "@ant-design/icons/lib";
import { useHistory } from "react-router-dom";

export function Aws(): React.ReactElement {
  const history = useHistory();
  const breadcumbsContext = useContext(BreadcumbsContext);

  useEffect(() => {
    breadcumbsContext.setBreadcrumbs([
      <Breadcrumb.Item
        key="aws"
        href=""
        onClick={(event: SyntheticEvent): void => {
          event.preventDefault();
          history.push("/dashboard/aws");
        }}
      >
        <AmazonOutlined />
        <span>AWS</span>
      </Breadcrumb.Item>,
    ]);
  }, []);

  return <Card bordered={false}>AWS</Card>;
}
