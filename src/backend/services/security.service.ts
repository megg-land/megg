import { v4 } from "uuid";
import { megg } from "../../shared/constants";
import { decrypt, encrypt, hash } from "./crypto.service";
import { getSession, setSession } from "./session.service";
import { deletePassword, findCredentials, setPassword } from "keytar";
import { CredentialModel, isCredentialModel } from "../../shared/models/credential.model";
import { CloudProviderEnum } from "../../shared/enums/cloud-provider.enum";
import { AccountCreationModel } from "../models/accountCreation.model";

export async function getAllCredentias(): Promise<CredentialModel[]> {
  const secret = (await getSession()).secret;

  return (await findCredentials(megg))
    .map(encryptedCredential => {
      try {
        const credentialModel = JSON.parse(decrypt(encryptedCredential.password, secret));

        if (isCredentialModel(credentialModel)) {
          return credentialModel;
        }
      } catch (e) {
        // TODO cant decrypt data and should throw exception.
        if (e.message === "Unsupported state or unable to authenticate data") {
          console.debug(e.message);
        }
      }
    })
    .filter(e => e !== undefined)
    .sort((x, y) => Number(y.favorite) - Number(x.favorite));
}

export async function saveCredential(credential: CredentialModel): Promise<boolean> {
  const secret = (await getSession()).secret;

  if (
    !credential ||
    !credential.password ||
    !credential.account ||
    !credential.cloudProvider ||
    credential.favorite === null ||
    credential.favorite === undefined ||
    !Object.values(CloudProviderEnum).includes(credential.cloudProvider)
  ) {
    return false;
  }

  credential.id = v4();

  if (credential.favorite) {
    for (const credential of await getAllCredentias()) {
      credential.favorite = false;
      await setPassword(megg, credential.id, encrypt(JSON.stringify(credential), secret));
    }
  }

  await setPassword(megg, credential.id, encrypt(JSON.stringify(credential), secret));
  return true;
}

export async function deleteCredential(id: string): Promise<boolean> {
  if (!id) {
    return false;
  }

  await deletePassword(megg, id);
  return true;
}

export async function createAccount(accountCreationModel: AccountCreationModel): Promise<boolean> {
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

export async function login(password: string): Promise<boolean> {
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

export async function setFavorite(id: string): Promise<void> {
  if (!id) {
    return;
  }

  const secret = (await getSession()).secret;

  for (const credential of await getAllCredentias()) {
    credential.favorite = credential.id === id;
    await setPassword(megg, credential.id, encrypt(JSON.stringify(credential), secret));
  }
}
