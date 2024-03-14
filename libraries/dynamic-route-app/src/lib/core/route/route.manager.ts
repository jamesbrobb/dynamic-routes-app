import {Observable} from "rxjs";


export class RouteManager {

  urlChange$: Observable<string> = new Observable<string>();

  navigateByUrl(url: string): void {

  }
}
