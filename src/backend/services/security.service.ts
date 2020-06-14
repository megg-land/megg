import { hostname } from "os";
import { megg } from "../../shared/constants";
import { decrypt, encrypt, hash } from "./crypto.service";
import { getSession, setSession } from "./session.service";
import { deletePassword, findCredentials, getPassword, setPassword } from "keytar";
import { CredentialModel } from "../../shared/models/credential.model";
import { CloudProviderEnum } from "../../shared/enums/cloud-provider.enum";

export async function saveCredential(...args: unknown[]): Promise<void> {
  const credential = args[0] as CredentialModel;

  if (
    !credential ||
    !credential.password ||
    !credential.accountAndService ||
    !credential.accountAndService.account ||
    !credential.accountAndService.service ||
    !Object.values(CloudProviderEnum).includes(credential.accountAndService.service)
  ) {
    // TODO fix errors
    throw new Error("Invalid credentials");
  }

  const session = await getSession();

  await setPassword(
    megg,
    encrypt(JSON.stringify(credential.accountAndService), session.secret),
    encrypt(credential.password, session.secret),
  );
}

export async function createAccount(...args: unknown[]): Promise<void> {
  const passwordInput1 = args[0] as string;
  const passwordInput2 = args[0] as string;

  if (passwordInput1 !== passwordInput2) {
    // TODO fix errors
    throw new Error("Invalid password input");
  }

  const secret = hash(passwordInput1);

  const credentials = await findCredentials(megg);

  for (const c of credentials) {
    await deletePassword(megg, c.account);
  }

  await setPassword(megg, hostname(), encrypt(megg, secret));
}

export async function login(...args: unknown[]): Promise<void> {
  const password = args[0] as string;

  if (!password) {
    // TODO fix errors
    throw new Error("Invalid credentials");
  }

  const savedPassword: string | null = await getPassword(megg, hostname());

  if (!savedPassword) {
    // TODO fix errors
    throw new Error("User dont have a account");
  }

  const secret = hash(password);

  try {
    decrypt(savedPassword, secret);
  } catch (e) {
    // TODO fix errors
    throw new Error("Invalid password input");
  }

  // TODO maybe change this to the function that feeds the dash
  const credentials = await findCredentials(megg);

  for (const credential of credentials) {
    try {
      decrypt(credential.password, secret);
    } catch (e) {
      throw new Error("Invalid password input");
    }
  }

  await setSession(secret);
}

/*async function getAllCredentials(secret: string): Promise<CredentialModel[]> {
  const credentials = await findCredentials(megg);

  if (!credentials || credentials.length > 0) {
    return;
  }

  const returnList: CredentialModel[] = [];

  for (const credential of credentials) {
    try {
      returnList.push({
        accountAndService: JSON.parse(decrypt(credential.account, secret)) as AccountAndServiceModel,
        password: decrypt(credential.password, secret),
      });
    } catch (e) {
      throw new Error("Invalid credentials");
    }
  }

  return returnList;

  /!*  return (
    await Promise.all(
      Object.values(CloudProviderEnum).map(async service => {
        return (await findCredentials(resolveServiceName(service))).map(e => {
          return { ...e, service };
        });
      }),
    )
  ).flat();*!/
}*/

/*export async function getCredentialByAccountAndService(...args: unknown[]): Promise<CredentialModel> {
  const credential = args[0] as CredentialModel;

  if (
    !credential ||
    !credential.service ||
    !Object.values(CloudProviderEnum).includes(credential.service) ||
    !credential.account
  ) {
    throw new Error("Invalid credentials");
  }

  return {
    ...credential,
    password: await getPassword(resolveServiceName(credential.service), credential.account),
  };
}
*/
