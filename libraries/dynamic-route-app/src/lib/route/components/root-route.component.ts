import {ChangeDetectionStrategy, Component, inject, InjectionToken} from '@angular/core';
import {AsyncPipe, JsonPipe, NgIf} from "@angular/common";
import {MatDividerModule} from "@angular/material/divider";
import {ContentNodeContentType, RouteNode} from "../config/route-config.types";
import {RouteManager} from "../route.manager";
import {BreadcrumbsComponent} from "../../components/breadcrumbs/breadcrumbs.component";
import {
  AppContentLoaderDirective,
  DEFAULT_CONTENT_LOADER_COMPONENT
} from "../../components/app-content-loader/app-content-loader.directive";
import {GuardTypePipe} from "@jamesbenrobb/ui";
import {isContentNode} from "../config/route-config.type-guards";


export const ContentComponentTypeService = new InjectionToken<string>(
  'ContentComponentTypeService', {
    factory: () => DEFAULT_CONTENT_LOADER_COMPONENT
  });


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
    AppContentLoaderDirective,
    GuardTypePipe
  ],
  styleUrls: ['./root-route.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RootRouteComponent<T extends ContentNodeContentType> {

  readonly #routesManager = inject(RouteManager<T>);

  readonly contentComponentType = inject(ContentComponentTypeService, {optional: true});
  readonly routeNodes$ = this.#routesManager.currentRouteNodes$;

  readonly isContentNode = isContentNode;

  onRouteSelected(node: RouteNode<T>): void {
    this.#routesManager.navigateByNode(node);
  }
}
