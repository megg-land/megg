import "./index.css";
import { Card, Layout } from "antd";
import QueueAnim from "rc-queue-anim";
import React, { ReactNode } from "react";

interface Props {
  children?: ReactNode;
  iconCover: ReactNode;
  cardClass: string;
}

export default function CentralizedCard(props: Props): React.ReactElement {
  return (
    <QueueAnim type={["right", "left"]}>
      <Layout key="layout" className="layout-centralized">
        <Card key="card" className={props.cardClass} bordered={false} cover={props.iconCover}>
          {props.children}
        </Card>
      </Layout>
    </QueueAnim>
  );
}
