import {EnvironmentProviders, makeEnvironmentProviders} from "@angular/core";
import {RouteManager} from "../core/route/route.manager";


export function getRouteProviders(): EnvironmentProviders {
  return makeEnvironmentProviders([
    RouteManager
  ]);
}
