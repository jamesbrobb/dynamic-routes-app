import {EnvironmentProviders, Provider} from "@angular/core";
import {provideRouter, Router} from "@angular/router";
import {ConfigLoader} from "@jamesbenrobb/core";
import {Title} from "@angular/platform-browser";

import {getAppRoutes} from "./routes";
import {RouteManager, ContentNodeContentType, getAllChildNodes, RoutesConfig} from "../core";
import {NgRouterAdaptor} from "./router.adaptor";
import {getRouteConfigProviders, RoutesConfigService} from "./core/route-config.providers";



export function getRouteProviders<T extends ContentNodeContentType>(
  configPath: string,
  appName: string,
  getAllChildNodes?: getAllChildNodes<T>
): (Provider | EnvironmentProviders)[] {
  return [
    getRouteConfigProviders(configPath),
    provideRouter(getAppRoutes<T>()),
    {
      provide: RouteManager<T>,
      useFactory: (configLoader: ConfigLoader<RoutesConfig<T>>, router: Router, titleService: Title) => {
        const routes = configLoader.getValueByKey("routes");
        if (!routes) {
          throw new Error("Routes not found");
        }
        return new RouteManager<T>(
          routes,
          new NgRouterAdaptor(router, titleService, appName),
          getAllChildNodes
        );
      },
      deps: [
        RoutesConfigService,
        Router,
        Title
      ]
    }
  ];
}
