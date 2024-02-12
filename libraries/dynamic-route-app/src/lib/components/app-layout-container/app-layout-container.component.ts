import {ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, ViewChild} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatSidenav, MatSidenavModule} from "@angular/material/sidenav";
import {MatToolbarModule} from "@angular/material/toolbar";
import {SideMenuComponent} from "../side-menu/side-menu.component";
import {MediaMatcher} from "@angular/cdk/layout";
import {ContentNodeContentType, RouteManager} from "../../route";
import {AppContentComponent} from "../app-content/app-content.component";


@Component({
  selector: 'jbr-dra-app-layout-container',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    SideMenuComponent,
    AppContentComponent
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
