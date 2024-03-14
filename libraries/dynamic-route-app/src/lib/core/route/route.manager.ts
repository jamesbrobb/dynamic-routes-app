import {Observable} from "rxjs";


export interface RouteManager {
  urlChange$: Observable<string>
  navigateByUrl(url: string): void
}


export class NoopRouteManager implements RouteManager {

  urlChange$: Observable<string> = new Observable<string>();
  navigateByUrl(url: string): void {}
}
