import { createContext } from "react";
import { AuthContextModel } from "../model/authContext.model";

export const AuthContext = createContext<AuthContextModel>({
  isAuthenticated: false,
  setIsAuthenticated: (isAuthenticated: boolean) => {
    return isAuthenticated;
  },
});
