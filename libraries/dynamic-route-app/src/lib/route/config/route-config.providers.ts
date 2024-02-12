import {APP_INITIALIZER, EnvironmentProviders, InjectionToken, makeEnvironmentProviders} from "@angular/core";
import {ConfigLoader} from "@jamesbenrobb/core";
import {ContentNodeContentType, RoutesConfig} from "./route-config.types";


export const RoutesConfigService = new InjectionToken<ConfigLoader<RoutesConfig<any>>>('RoutesConfigService');


export function getRouteConfigProviders<T extends ContentNodeContentType>(path: string): EnvironmentProviders {
  return makeEnvironmentProviders([{
    provide: APP_INITIALIZER,
    useFactory: (configLoader: ConfigLoader<RoutesConfig<T>>) => {
      return () => configLoader.load();
    },
    deps: [RoutesConfigService],
    multi: true
  }, {
    provide: RoutesConfigService,
    useValue: new ConfigLoader<RoutesConfig<T>>(path)
  }]);
}
