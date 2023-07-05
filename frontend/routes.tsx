import MainLayout from "Frontend/views/MainLayout.js";
import { lazy } from "react";
import {
  createBrowserRouter,
  IndexRouteObject,
  NonIndexRouteObject,
  useMatches,
} from "react-router-dom";
import { Edf_Table } from "./views/Edf_Table";
import { Dep_Table } from "./views/Dep_Table";
import { Edi_Dep_Table } from "./views/Edi_Dep_Table";

export type MenuProps = Readonly<{
  icon?: string;
  title?: string;
}>;

export type ViewMeta = Readonly<{ handle?: MenuProps }>;

type Override<T, E> = Omit<T, keyof E> & E;

export type IndexViewRouteObject = Override<IndexRouteObject, ViewMeta>;
export type NonIndexViewRouteObject = Override<
  Override<NonIndexRouteObject, ViewMeta>,
  {
    children?: ViewRouteObject[];
  }
>;
export type ViewRouteObject = IndexViewRouteObject | NonIndexViewRouteObject;

type RouteMatch = ReturnType<typeof useMatches> extends (infer T)[] ? T : never;

export type ViewRouteMatch = Readonly<Override<RouteMatch, ViewMeta>>;

export const useViewMatches = useMatches as () => readonly ViewRouteMatch[];

export const routes: readonly ViewRouteObject[] = [
  {
    path: "/",
    element: <MainLayout />,
    handle: { icon: "null", title: "Menu Principal" },
    children: [
      {
        path: "/edificios",
        element: <Edf_Table />,
        handle: { icon: "building", title: "Edificios" },
      },
      {
        path: "/dependencias",
        element: <Dep_Table />,
        handle: { icon: "building", title: "Dependencias" },
      },
      {
        path: "/EdiDep",
        element: <Edi_Dep_Table />,
      },
    ],
  },
];

const router = createBrowserRouter([...routes]);
export default router;
