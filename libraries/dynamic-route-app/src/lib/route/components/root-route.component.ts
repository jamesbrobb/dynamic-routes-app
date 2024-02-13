import {ChangeDetectionStrategy, Component, inject, InjectionToken} from '@angular/core';
import {AsyncPipe, JsonPipe, NgIf} from "@angular/common";
import {MatDividerModule} from "@angular/material/divider";
import {ContentNodeContentType, RouteNode} from "../config/route-config.types";
import {RouteManager} from "../route.manager";
import {BreadcrumbsComponent} from "../../components/breadcrumbs/breadcrumbs.component";
import {AppContentLoaderDirective} from "../../components/app-content-loader/app-content-loader.directive";


export const ContentComponentTypeService = new InjectionToken<string>('ContentComponentTypeService');


@Component({
  selector: 'jbr-dra-root-route',
  standalone: true,
  templateUrl: './root-route.component.html',
  imports: [
    NgIf,
    BreadcrumbsComponent,
    MatDividerModule,
    JsonPipe,
    AsyncPipe,
    AppContentLoaderDirective
  ],
  styleUrls: ['./root-route.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RootRouteComponent<T extends ContentNodeContentType> {

  readonly #routesManager = inject(RouteManager<T>);

  readonly contentComponentType = inject(ContentComponentTypeService);
  readonly routeNodes$ = this.#routesManager.currentRouteNodes$;

  onRouteSelected(node: RouteNode<T>): void {
    this.#routesManager.navigateByNode(node);
  }
}
