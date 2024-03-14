import {BehaviorSubject} from "rxjs";
import {MenuConfig, MenuItemNode} from "./menu-config";
import {RouteManager} from "../route/route.manager";


export class MenuService {

  readonly #menuConfig: MenuConfig;
  readonly #routeManager: RouteManager;
  readonly #currentNodes = new BehaviorSubject<MenuItemNode[]>([])

  readonly currentNodes$ = this.#currentNodes.asObservable();

  get menuNodes(): MenuItemNode[] {
    return [...this.#menuConfig];
  }

  constructor(routeManager: RouteManager, config?: MenuConfig) {

    if(!config) {
      console.warn('No menu config provided');
    }

    this.#menuConfig = config || [];

    this.#routeManager = routeManager;
    this.#routeManager.urlChange$
      .subscribe(url => {
        this.#onUrlUpdate(url);
      });
  }

  selectNode(node: MenuItemNode): void {
    this.#routeManager.navigateByUrl(node.path);
  }

  #onUrlUpdate(url: string): void {

    if (!url) {
      return;
    }

    this.#currentNodes.next(this.#getCurrentNodes(url));
  }

  #getCurrentNodes(url: string): MenuItemNode[] {
    const frags: string[] = url.split(/(?=\/)/)
      .filter(value => !!value);

    let node: MenuItemNode | undefined,
      nodes: MenuItemNode[] = this.menuNodes,
      currentNodes: MenuItemNode[] = [],
      frag: string = '';

    frags.map((frg: string, index: number) => {

      frag = `${frag}${frg}`;
      node = nodes.find((value: MenuItemNode) => value.path === frag);

      if(!node) {
        return;
      }

      currentNodes.unshift(node);

      if(!node.children) {
        return;
      }

      nodes = node.children;
    });

    return currentNodes;
  }
}
