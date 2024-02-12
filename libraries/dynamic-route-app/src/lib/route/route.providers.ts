import {EnvironmentProviders, Provider, Type} from "@angular/core";
import {ActivatedRoute, provideRouter, Router} from "@angular/router";
import {ConfigLoader} from "@jamesbenrobb/core";
import {getRouteConfigProviders, RoutesConfigService} from "./config/route-config.providers";
import {getAppRoutes} from "./routes";
import {ContentNodeContentType, getAllChildNodes, RoutesConfig} from "./config/route-config.types";
import {RouteManager} from "./route.manager";
import {NgRouterAdaptor} from "../ng/route/ng-router.adaptor";
import {JBRDRARootRouteComponent} from "./components/root-route.component.type";
import {Title} from "@angular/platform-browser";



export function getRouteProviders<T extends ContentNodeContentType>(
  configPath: string,
  appName: string,
  rootComponent?: Type<JBRDRARootRouteComponent<T>>,
  getAllChildNodes?: getAllChildNodes<T>
): (Provider | EnvironmentProviders)[] {
  return [
    getRouteConfigProviders(configPath),
    provideRouter(getAppRoutes<T>(rootComponent)),
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
