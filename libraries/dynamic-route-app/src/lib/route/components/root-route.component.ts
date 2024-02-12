import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {AsyncPipe, JsonPipe, NgIf} from "@angular/common";
import {MatDividerModule} from "@angular/material/divider";
import {ContentNodeContentType} from "../config/route-config.types";
import {RouteManager} from "../route.manager";
import {BreadcrumbsComponent} from "../../components/breadcrumbs/breadcrumbs.component";
import {JBRDRARootRouteComponent} from "./root-route.component.type";



@Component({
  selector: 'jbr-dra-default-root-route',
  standalone: true,
  templateUrl: './root-route.component.html',
  imports: [
    NgIf,
    BreadcrumbsComponent,
    MatDividerModule,
    JsonPipe,
    AsyncPipe
  ],
  styleUrls: ['./root-route.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DefaultRootRouteComponent<T extends ContentNodeContentType> implements JBRDRARootRouteComponent<T> {

  readonly #routesManager = inject(RouteManager<T>);
  readonly routeNodes$ = this.#routesManager.currentRouteNodes$;
}
