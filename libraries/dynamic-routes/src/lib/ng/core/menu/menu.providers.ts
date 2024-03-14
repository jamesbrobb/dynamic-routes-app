import {EnvironmentProviders, makeEnvironmentProviders} from "@angular/core";
import {ConfigLoader} from "@jamesbenrobb/core";
import {MenuConfigService} from "@jamesbenrobb/dynamic-route-app";
import {menuConfigFactory, RoutesConfig} from "../../../core";
import {RoutesConfigService} from "../route-config.providers";


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
