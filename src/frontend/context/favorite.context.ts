import { createContext } from "react";
import { FavoriteContextModel } from "../model/favorite.model";
import { CredentialModel } from "../../shared/models/credential.model";

export const FavoriteContext = createContext<FavoriteContextModel>({
  favorite: null,
  setFavorite: (favorite: CredentialModel) => {
    return favorite;
  },
});
