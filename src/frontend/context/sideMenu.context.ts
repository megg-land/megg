import { createContext } from "react";
import { SideMenuContextModel } from "../model/sideMenu.model";

export const SideMenuContext = createContext<SideMenuContextModel>({
  selectedKeys: [],
  setSelectedKeys: (selectedKeys: string[]) => {
    return selectedKeys;
  },
});
