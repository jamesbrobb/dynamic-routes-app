import {Routes} from "@angular/router";
import {shouldRedirect} from "./route.guards";
import {getRouteNodes} from "./route.resolvers";
import {ContentNodeContentType} from "./config/route-config.types";
import {DefaultRootRouteComponent} from "./components/root-route.component";
import {Type} from "@angular/core";
import {JBRDRARootRouteComponent} from "./components/root-route.component.type";


export function getAppRoutes<T extends ContentNodeContentType>(
  rootComponent?: Type<JBRDRARootRouteComponent<T>>
): Routes {
  return [
    {
      path: '**',
      component: rootComponent || DefaultRootRouteComponent<T>,
      canActivate: [shouldRedirect],
      resolve: {
        routeNodes: getRouteNodes<T>
      }
    },
  ]
}
