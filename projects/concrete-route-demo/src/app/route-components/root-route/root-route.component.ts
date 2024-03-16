import {Component, inject} from '@angular/core';
import {ActivatedRoute, Data, Route} from "@angular/router";
import {JsonPipe} from "@angular/common";
import {tap} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-root-route',
  standalone: true,
  imports: [
    JsonPipe
  ],
  templateUrl: './root-route.component.html',
  styleUrl: './root-route.component.scss'
})
export class RootRouteComponent {

  readonly activatedRoute = inject(ActivatedRoute);

  protected route?: Route | null;
  protected routeData?: Data;

  constructor() {

    this.activatedRoute.url.pipe(
      tap(url => {
        let current: ActivatedRoute | null = this.activatedRoute;
        while(current.firstChild) {
          current = current.firstChild;
        }

        this.route = current.routeConfig;
        this.routeData = this.route?.data;
      }),
      takeUntilDestroyed()
    ).subscribe();
  }
}
