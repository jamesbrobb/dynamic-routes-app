import {map} from "rxjs";
import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {MatDivider} from "@angular/material/divider";
import {AsyncPipe} from "@angular/common";
import {BreadcrumbsComponent} from "@jamesbenrobb/ui";
import {MenuService} from "../../core/menu/menu.service";


@Component({
  selector: 'jbr-dra-breadcrumbs-container',
  standalone: true,
  imports: [
    MatDivider,
    AsyncPipe,
    BreadcrumbsComponent
  ],
  templateUrl: './breadcrumbs-container.component.html',
  styleUrl: './breadcrumbs-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BreadcrumbsContainerComponent {
  protected readonly menuService = inject(MenuService);
  protected readonly currentNodes$ = this.menuService.currentNodes$.pipe(
    map(nodes => [...nodes].reverse())
  );
}
