import {Routes} from "@angular/router";
import {shouldRedirect} from "./route.guards";
import {getRouteNodes} from "./route.resolvers";
import {ContentNodeContentType} from "./config/route-config.types";
import {RootRouteComponent} from "./components/root-route.component";


export function getAppRoutes<T extends ContentNodeContentType>(): Routes {
  return [
    {
      path: '**',
      component: RootRouteComponent<T>,
      canActivate: [shouldRedirect],
      resolve: {
        routeNodes: getRouteNodes<T>
      }
    },
  ]
}
