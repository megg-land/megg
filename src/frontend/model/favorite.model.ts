import { CredentialModel } from "../../shared/models/credential.model";

export interface FavoriteContextModel {
  favorite: CredentialModel;
  setFavorite(favorite: CredentialModel): void;
}
