import { ApplicationConfig } from '@angular/core';
import {getJBRDRAAppProviders, RouteManagerService} from "@jamesbenrobb/dynamic-route-app";
import {getAppProviders, RouteManager} from "@jamesbenrobb/dynamic-routes";


export const appConfig: ApplicationConfig = {
  providers: [
    ...getJBRDRAAppProviders({
      showBreadcrumbs: true,
      showColorModeBtn: true
    }),
    ...getAppProviders(
      'assets/route-config.json',
      'Demo App'
    ),
    {
      provide: RouteManagerService,
      useExisting: RouteManager
    }
  ]
};
