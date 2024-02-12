import {ContentNodeContentType, RouteNode} from "../config/route-config.types";
import {Observable} from "rxjs";


export interface JBRDRARootRouteComponent<T extends ContentNodeContentType> {
  readonly routeNodes$: Observable<RouteNode<T>[]>
}
