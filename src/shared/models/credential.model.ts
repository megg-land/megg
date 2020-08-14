import { CloudProviderEnum } from "../enums/cloud-provider.enum";

export function isCredentialModel(model: CredentialModel | string): model is CredentialModel {
  return (model as CredentialModel).id !== undefined;
}

export interface CredentialModel {
  id: string;
  favorite: boolean;
  cloudProvider: CloudProviderEnum;
  account: string;
  password: string | null;
}
