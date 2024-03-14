import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {MatDivider} from "@angular/material/divider";
import {BreadcrumbsComponent} from "../breadcrumbs/breadcrumbs.component";
import {MenuService} from "../../core/menu/menu.service";
import {AsyncPipe} from "@angular/common";


@Component({
  selector: 'jbr-dra-breadcrumbs-container',
  standalone: true,
  imports: [
    MatDivider,
    BreadcrumbsComponent,
    AsyncPipe
  ],
  templateUrl: './breadcrumbs-container.component.html',
  styleUrl: './breadcrumbs-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BreadcrumbsContainerComponent {
  protected readonly menuService = inject(MenuService);
}
