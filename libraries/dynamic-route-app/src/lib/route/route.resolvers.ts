import {ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {inject} from "@angular/core";
import {ContentNodeContentType, RouteNode} from "./config/route-config.types";
import {RouteManager} from "./route.manager";


export const getRouteNodes =
  <T extends ContentNodeContentType>(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): RouteNode<T>[] | undefined => {
    const routesManager = inject(RouteManager<T>);
    return routesManager.getRouteNodesByPath(state.url);
  }
