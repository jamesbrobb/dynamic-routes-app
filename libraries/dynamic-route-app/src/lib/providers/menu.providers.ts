import {EnvironmentProviders, InjectionToken, makeEnvironmentProviders, Optional} from "@angular/core";

import {MenuConfig} from "../core/menu/menu-config";
import {MenuService} from "../core/menu/menu.service";
import {RouteManager} from "../core/route/route.manager";


export const MenuConfigService = new InjectionToken<MenuConfig>('MenuConfigService');


export function getMenuProviders(): EnvironmentProviders {
  return makeEnvironmentProviders([{
    provide: MenuService,
    useClass: MenuService,
    deps: [
      RouteManager,
      [new Optional(), MenuConfigService]
    ]
  }]);
}
