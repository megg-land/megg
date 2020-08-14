import { createContext } from "react";
import { CredentialModel } from "../../shared/models/credential.model";

export const CredentialsContext = createContext<{
  credentials: CredentialModel[] | null;
  setCredentials(credentials: CredentialModel[] | null): void;
}>({
  credentials: [],
  setCredentials: (credential: CredentialModel[] | null) => {
    return credential;
  },
});
