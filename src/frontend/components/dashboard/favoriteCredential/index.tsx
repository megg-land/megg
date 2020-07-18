import "./index.css";
import React, { useContext, useEffect } from "react";
import { FavoriteContext } from "../../../context/favorite.context";
import { ChannelEnum } from "../../../../shared/enums/channel.enum";
import { CredentialModel } from "../../../../shared/models/credential.model";
import { AmazonOutlined } from "@ant-design/icons/lib";
import { CloudProviderEnum } from "../../../../shared/enums/cloud-provider.enum";

const { api } = window;

interface Props {
  isCollapsed: boolean;
}

export default function FavoriteCredential(props: Props): React.ReactElement {
  const favoriteContext = useContext(FavoriteContext);

  useEffect(() => {
    const getFavorite = async (): Promise<void> => {
      favoriteContext.setFavorite((await api.invoke(ChannelEnum.GET_FAVORITE)) as CredentialModel);
    };

    getFavorite();
  }, []);

  function noFavorite(): React.ReactElement {
    return <div>No Credential</div>;
  }

  function getAwsCredential(): React.ReactElement {
    if (props.isCollapsed) {
      return <AmazonOutlined id="collapsed" />;
    }

    return <AmazonOutlined />;
  }

  function getFavorite(): React.ReactElement {
    if (favoriteContext.favorite) {
      if (favoriteContext.favorite.cloudProvider === CloudProviderEnum.AWS) {
        return getAwsCredential();
      }
    }

    return noFavorite();
  }

  return <div className="favorite-credential">{getFavorite()}</div>;
}
