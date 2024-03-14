import {ApplicationConfig} from '@angular/core';
import {getJBRDRAAppProviders} from "@jamesbenrobb/dynamic-route-app";


export const appConfig: ApplicationConfig = {
  providers: [
    ...getJBRDRAAppProviders({
      showBreadcrumbs: true,
      showColorModeBtn: true
    })
  ]
};
