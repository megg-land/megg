import React from "react";
import { AuthContextModel } from "../model/authContextModel";

export const AuthContext = React.createContext<AuthContextModel>({
  isAuthenticated: false,
  setIsAuthenticated: (isAuthenticated: boolean) => {
    return isAuthenticated;
  },
});
