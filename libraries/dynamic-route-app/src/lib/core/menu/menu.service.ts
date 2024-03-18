import {NavigationService, NavItemNode} from "@jamesbenrobb/ui";
import {RouteManager} from "../route/route.manager";
import {tap} from "rxjs";


export class MenuService {

  readonly #navService: NavigationService;
  readonly #routeManager: RouteManager;

  get nodes() {
    return this.#navService.nodes;
  }

  get currentNodes$() {
    return this.#navService.currentNodes$;
  }

  constructor(navService: NavigationService, routeManager: RouteManager) {
    this.#navService = navService;
    this.#routeManager = routeManager;

    this.#routeManager.urlChange$.pipe(
      tap(url => this.#navService.onUrlUpdate(url))
    ).subscribe();
  }

  selectNode(node: NavItemNode): void {
    this.#routeManager.navigateByUrl(node.path);
  }
}
