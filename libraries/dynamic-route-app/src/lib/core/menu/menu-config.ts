
export type MenuConfig = MenuItemNode[];

export type MenuItemNode = {
  label: string
  path: string
  hasContent: boolean
  active: number
  children?: MenuItemNode[]
}

export type MenuConfigFactory<T> = (routeConfig: T[]) => MenuConfig;
