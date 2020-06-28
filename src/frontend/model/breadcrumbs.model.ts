import { ReactNode } from "react";

export interface BreadcrumbsContextModel {
  breadcrumbs: Array<ReactNode>;
  setBreadcrumbs(breadcrumbs: Array<ReactNode>): void;
}
