import {EnvironmentProviders, InjectionToken, makeEnvironmentProviders} from "@angular/core";
import {ConfigLoader} from "@jamesbenrobb/core";
import {RoutesConfig, RoutesConfigService} from "../../route";
import {MenuConfig, menuConfigFactory} from "./menu-config";


export const MenuConfigService = new InjectionToken<MenuConfig>('MenuConfigService');


export function getMenuProviders(): EnvironmentProviders {
  return makeEnvironmentProviders([{
    provide: MenuConfigService,
    useFactory: (routesConfig: ConfigLoader<RoutesConfig<any>>) => {
      const routes = routesConfig.getValueByKey("routes");
      if (!routes) {
        throw new Error("Routes not found");
      }
      return menuConfigFactory(routes);
    },
    deps: [RoutesConfigService]
  }]);
}
