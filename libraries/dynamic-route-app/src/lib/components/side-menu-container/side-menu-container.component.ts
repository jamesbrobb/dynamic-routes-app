import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {AsyncPipe} from "@angular/common";

import {MenuService} from "../../core/menu/menu.service";
import {SideMenuLoaderDirective} from "../side-menu-loader/side-menu-loader.directive";
import {AppSettings} from "../../app.settings";





@Component({
  selector: 'jbr-dra-side-menu-container',
  standalone: true,
  imports: [
    SideMenuLoaderDirective,
    AsyncPipe
  ],
  templateUrl: './side-menu-container.component.html',
  styleUrl: './side-menu-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SideMenuContainerComponent {

  protected readonly menuService = inject(MenuService);
  protected readonly menuComponentType = inject(AppSettings).sideMenuComponentType;
}
