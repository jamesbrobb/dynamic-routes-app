import {EnvironmentProviders, InjectionToken, makeEnvironmentProviders, Optional} from "@angular/core";

import {MenuConfig, RouteManager} from "../core";
import {MenuService} from "../core/menu/menu.service";
import {RouteManagerService} from "./route.providers";


export const MenuConfigService = new InjectionToken<MenuConfig>('MenuConfigService');


export function getMenuProviders(): EnvironmentProviders {
  return makeEnvironmentProviders([{
    provide: MenuService,
    useFactory: (routeManager?: RouteManager, menuConfig?: MenuConfig) => {

      if(!routeManager) {
        console.warn('No route manager provided through RouteManagerService Token');
      }

      if(!menuConfig) {
        console.warn('No menu config provided through MenuConfigService Token');
      }

      return new MenuService(routeManager, menuConfig);
    },
    deps: [
      [new Optional(), RouteManagerService],
      [new Optional(), MenuConfigService]
    ]
  }]);
}
