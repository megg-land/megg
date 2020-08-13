import { createContext } from "react";
import { CredentialModel } from "../../shared/models/credential.model";

export const SelectedCredentialContext = createContext<{
  credential: CredentialModel | null;
  setCredential(credential: CredentialModel | null): void;
}>({
  credential: null,
  setCredential: (credential: CredentialModel | null) => {
    return credential;
  },
});
