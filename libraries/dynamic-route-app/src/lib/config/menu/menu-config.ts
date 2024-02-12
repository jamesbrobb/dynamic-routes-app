import {isContentNode, isParentNode, isRedirectNode, RouteNode} from "../../route";


export type MenuConfig = MenuItemNode[];

export type MenuItemNode = {
  label: string
  path: string
  hasContent: boolean
  active: number
  children?: MenuItemNode[]
}

export function menuConfigFactory(routeConfig: RouteNode<any>[]): MenuConfig {

  return routeConfig
    .filter((routeNode) => !isRedirectNode(routeNode))
    .map((route) => parse(route));
}

function parse(route: RouteNode<any>, parentPath: string = ''): MenuItemNode {

  const path = `${parentPath}/${route.path}`,
    label = route.label ?? route.path.split('-').join(' '),
    children = isParentNode(route) ? route.children.map((route) => parse(route, path)) : undefined;

  return {
    path,
    label,
    active: 0,
    children,
    hasContent: isContentNode(route)
  }
}
