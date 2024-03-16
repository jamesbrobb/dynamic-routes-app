import {RouteManager} from "../route/route.manager";
import {MenuService} from "./menu.service";


export class MenuManager {

  readonly #routeManager: RouteManager;
  readonly #menuService: MenuService;

  constructor(routeManager: RouteManager, menuService: MenuService) {
    this.#routeManager = routeManager;
    this.#menuService = menuService;
  }
}
