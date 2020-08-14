import { createContext, ReactNode } from "react";

export const BreadcrumbsContext = createContext<{
  breadcrumbs: ReactNode[];
  setBreadcrumbs(breadcrumbs: ReactNode[]): void;
}>({
  breadcrumbs: [],
  setBreadcrumbs: (breadcrumbs: Array<ReactNode>) => {
    return breadcrumbs;
  },
});
