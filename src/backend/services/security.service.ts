import { v4 } from "uuid";
import { megg } from "../../shared/constants";
import { decrypt, encrypt, hash } from "./crypto.service";
import { getSession, setSession } from "./session.service";
import { deletePassword, findCredentials, setPassword } from "keytar";
import { CredentialModel } from "../../shared/models/credential.model";
import { CloudProviderEnum } from "../../shared/enums/cloud-provider.enum";
import { AccountCreationModel } from "../models/accountCreation.model";

export async function saveCredential(...args: unknown[]): Promise<boolean> {
  const credential = args[0] as CredentialModel;

  if (
    !credential ||
    !credential.password ||
    !credential.accountAndService ||
    !credential.accountAndService.account ||
    !credential.accountAndService.service ||
    !Object.values(CloudProviderEnum).includes(credential.accountAndService.service)
  ) {
    return false;
  }

  await setPassword(megg, v4(), encrypt(JSON.stringify(credential), (await getSession()).secret));
  return true;
}

export async function createAccount(...args: unknown[]): Promise<boolean> {
  const accountCreationModel = args[0] as AccountCreationModel;

  if (
    !accountCreationModel ||
    !accountCreationModel.username ||
    !accountCreationModel.password ||
    !accountCreationModel.passwordConfirm ||
    accountCreationModel.username.length > 126 ||
    accountCreationModel.password.length > 126 ||
    accountCreationModel.passwordConfirm.length > 126 ||
    accountCreationModel.password !== accountCreationModel.passwordConfirm
  ) {
    return false;
  }

  for (const credential of await findCredentials(megg)) {
    await deletePassword(megg, credential.account);
  }

  await setPassword(megg, v4(), encrypt(accountCreationModel.username, hash(accountCreationModel.password)));
  return true;
}

export async function unlock(...args: unknown[]): Promise<boolean> {
  const password = args[0] as string;

  if (!password || password.length > 126) {
    return false;
  }

  const secret = hash(password);

  const credentials = await findCredentials(megg);

  if (!credentials || credentials.length === 0) {
    return false;
  }

  try {
    credentials.forEach(credential => decrypt(credential.password, secret));
  } catch (e) {
    return false;
  }

  await setSession({ secret });
  return true;
}

export async function isNewUser(): Promise<boolean> {
  return (await findCredentials(megg)).length < 1;
}
