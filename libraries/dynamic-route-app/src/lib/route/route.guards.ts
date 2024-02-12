import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {inject} from "@angular/core";
import {RouteManager} from "./route.manager";
import {isRedirectNode} from "./config/route-config.type-guards";


export const shouldRedirect: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree => {
  const router = inject(Router),
    routesManager = inject(RouteManager),
    routeNodes = routesManager.getRouteNodesByPath(state.url) || [],
    routeNode = routeNodes[routeNodes.length - 1];

  if(isRedirectNode(routeNode)) {
    return router.parseUrl(routeNode.redirectTo);
  }

  return true
}
