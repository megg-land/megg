import { CloudProviderEnum } from "../enums/cloud-provider.enum";

export interface AccountAndServiceModel {
  account: string;
  service: CloudProviderEnum;
}

export interface CredentialModel {
  accountAndService: AccountAndServiceModel;
  password: string;
}
