import {EnvironmentProviders, inject, InjectionToken, makeEnvironmentProviders} from "@angular/core";

import {NoopRouteManager} from "../core";
import {RouteManagerService} from "./route.providers";
import {NavConfig, NavigationService} from "@jamesbenrobb/ui";
import {MenuService} from "../core/menu/menu.service";


export const MenuConfigService = new InjectionToken<NavConfig>('MenuConfigService');


export function getMenuProviders(): EnvironmentProviders {
  return makeEnvironmentProviders([{
    provide: MenuService,
    useFactory: () => {
      const routeManager = inject(RouteManagerService, {optional: true}) || undefined,
        menuConfig = inject(MenuConfigService, {optional: true}) || undefined;

      if(!menuConfig) {
        console.warn('No menu config provided through MenuConfigService Token');
      }

      if(!routeManager) {
        console.warn('No route manager provided through RouteManagerService Token');
      }

      return new MenuService(
        new NavigationService(menuConfig),
        routeManager || new NoopRouteManager()
      );
    }
  }]);
}
