import "./index.css";
import { Spin } from "antd";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { ChannelEnum } from "../../../shared/enums/channel.enum";

const { api } = window;

export default function Home(): React.ReactElement {
  const history = useHistory();

  useEffect(() => {
    const getIsNewUser = async (): Promise<void> => {
      if ((await api.invoke(ChannelEnum.IS_NEW_USER)) === true) {
        history.push("/accountCreation");
      } else {
        history.push("/unlock");
      }
    };

    getIsNewUser();
  }, [history]);

  return <Spin size="large" className="page-loading" />;
}
