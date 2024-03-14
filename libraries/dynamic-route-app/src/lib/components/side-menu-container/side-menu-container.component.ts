import {ChangeDetectionStrategy, Component, inject, InjectionToken} from '@angular/core';
import {AsyncPipe} from "@angular/common";

import {MenuService} from "../../core/menu/menu.service";
import {DEFAULT_SIDE_MENU_COMPONENT, SideMenuLoaderDirective} from "../side-menu-loader/side-menu-loader.directive";


export const MenuComponentTypeService = new InjectionToken<string>(
  'MenuComponentTypeService', {
    factory: () => DEFAULT_SIDE_MENU_COMPONENT
  })


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
  protected readonly menuComponentType = inject(MenuComponentTypeService, {optional: true});
}
