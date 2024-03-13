import {Routes} from "@angular/router";
import {shouldRedirect} from "./route.guards";
import {getRouteNodes} from "./route.resolvers";
import {RootRouteComponent} from "./components/root-route.component";
import {ContentNodeContentType} from "../core";


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
