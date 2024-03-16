import {ApplicationConfig, inject} from '@angular/core';
import {NavigationEnd, provideRouter, Router, Routes} from '@angular/router';
import {
  getJBRDRAAppProviders,
  MenuConfigService,
  MenuItemNode,
  RouteManagerService,
  RouteManager
} from "@jamesbenrobb/dynamic-route-app";

import { routes } from './app.routes';
import {filter, map, Observable} from "rxjs";


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    ...getJBRDRAAppProviders({
      showBreadcrumbs: true,
      showColorModeBtn: true
    }),
    {
      provide: MenuConfigService,
      useFactory: () => convertRoutes(inject(Router).config)
    }, {
      provide: RouteManagerService,
      useFactory: () => new RouteMan(inject(Router))
    }
  ]
};


class RouteMan implements RouteManager {

  readonly #router: Router;

  readonly urlChange$: Observable<string>

  constructor(router: Router) {
    this.#router = router;

    this.urlChange$ = this.#router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map((event: NavigationEnd) => {
        return (event as NavigationEnd).url;
      })
    );
  }

  navigateByUrl(path: string): void {
    this.#router.navigateByUrl(path);
  }
}


function convertRoutes(routes: Routes, parentPath: string = ''): MenuItemNode[] {
  return routes.filter(route => route.path !== '**')
    .filter(route => route.path !== '')
    .filter(route => !route.redirectTo)
    .map(route => {

      const path = `${parentPath}/${route.path || 'no-path'}`;

      const node: MenuItemNode = {
        path,
        label: (route.path || '').replaceAll('-', ' '),
        hasContent: !!route.data,
        active: 0
      }

      if(route.children) {
        node.children = convertRoutes(route.children, path);
      }

      return node;
  });
}
