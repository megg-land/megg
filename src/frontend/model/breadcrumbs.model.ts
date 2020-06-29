import { ReactNode } from "react";

export interface BreadcrumbsContextModel {
  breadcrumbs: ReactNode[];
  setBreadcrumbs(breadcrumbs: ReactNode[]): void;
}
