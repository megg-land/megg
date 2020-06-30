import { createContext, ReactNode } from "react";
import { BreadcrumbsContextModel } from "../model/breadcrumbs.model";

export const BreadcrumbsContext = createContext<BreadcrumbsContextModel>({
  breadcrumbs: [],
  setBreadcrumbs: (breadcrumbs: Array<ReactNode>) => {
    return breadcrumbs;
  },
});
