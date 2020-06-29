import { CloudProviderEnum } from "../enums/cloud-provider.enum";

export interface CredentialModel {
  id: string;
  order: number;
  cloudProvider: CloudProviderEnum;
  account: string;
  password: string;
}
