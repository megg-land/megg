import { createContext } from "react";

export const SideMenuContext = createContext<{
  selectedKeys: string[];
  setSelectedKeys(selectedKeys: string[]): void;
}>({
  selectedKeys: [],
  setSelectedKeys: (selectedKeys: string[]) => {
    return selectedKeys;
  },
});
