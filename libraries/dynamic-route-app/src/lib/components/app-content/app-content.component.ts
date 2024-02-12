import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {AsyncPipe} from "@angular/common";
import {BreadcrumbsComponent} from "../breadcrumbs/breadcrumbs.component";
import {MatDividerModule} from "@angular/material/divider";
import {RouterOutlet} from "@angular/router";
import {ContentNodeContentType, RouteManager, RouteNode} from "../../route";

@Component({
  selector: 'jbr-dra-app-content',
  standalone: true,
  imports: [
    AsyncPipe,
    BreadcrumbsComponent,
    MatDividerModule,
    RouterOutlet
  ],
  templateUrl: './app-content.component.html',
  styleUrl: './app-content.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppContentComponent<T extends ContentNodeContentType> {

  readonly #routesManager = inject(RouteManager<T>);

  readonly routeNodes$ = this.#routesManager.currentRouteNodes$;
  onRouteSelected(node: RouteNode<T>): void {
    this.#routesManager.navigateByNode(node);
  }
}
