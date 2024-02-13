import {ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, ViewChild} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatSidenav, MatSidenavModule} from "@angular/material/sidenav";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MediaMatcher} from "@angular/cdk/layout";

import {ContentNodeContentType, RouteManager} from "../../route";
import {SideMenuContainerComponent} from "../side-menu-container/side-menu-container.component";
import {AppContentContainerComponent} from "../app-content-container/app-content-container.component";


@Component({
  selector: 'jbr-dra-app-layout-container',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    AppContentContainerComponent,
    SideMenuContainerComponent
  ],
  templateUrl: './app-layout-container.component.html',
  styleUrl: './app-layout-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppLayoutContainerComponent<T extends ContentNodeContentType> {

  @ViewChild(MatSidenav, { static: true }) sidenav?: MatSidenav;

  readonly #routesManager = inject(RouteManager<T>);
  readonly #mobileQueryListener: () => void;

  readonly mobileQuery: MediaQueryList;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.#mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this.#mobileQueryListener);

    this.#routesManager.urlChange$.subscribe(() => {
      if(!this.mobileQuery.matches) {
        return;
      }

      this.sidenav?.close();
    })
  }

  ngOnInit(): void {

    if(this.mobileQuery.matches) {
      return;
    }

    this.sidenav?.open();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this.#mobileQueryListener);
  }
}
