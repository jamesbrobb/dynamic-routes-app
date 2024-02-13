import {ChangeDetectionStrategy, Component, inject, InjectionToken} from '@angular/core';
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {AsyncPipe} from "@angular/common";
import {BehaviorSubject} from "rxjs";

import {MenuConfigService} from "../../config/menu/menu.providers";
import {MenuConfig, MenuItemNode} from "../../config/menu/menu-config";
import {RouteManager} from "../../route";
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

  readonly #routeManager = inject(RouteManager);
  readonly #currentNodes = new BehaviorSubject<MenuItemNode[]>([])

  readonly menuConfig: MenuConfig = inject(MenuConfigService);
  readonly menuComponentType = inject(MenuComponentTypeService, {optional: true});
  readonly currentNodes$ = this.#currentNodes.asObservable();


  constructor() {
    this.#routeManager.urlChange$
      .pipe(takeUntilDestroyed())
      .subscribe((url) => {
        this.#onUrlUpdate(url);
      });
  }

  onNodeSelected(node: MenuItemNode): void {
    this.#routeManager.navigateByUrl(node.path);
  }

  #onUrlUpdate(url: string): void {

    if (!url) {
      return;
    }

    this.#currentNodes.next(this.#getCurrentNodes(url));
  }

  #getCurrentNodes(url: string): MenuItemNode[] {
    const frags: string[] = url.split(/(?=\/)/)
      .filter(value => !!value);

    let node: MenuItemNode | undefined,
      nodes: MenuItemNode[] = this.menuConfig.concat([]),
      currentNodes: MenuItemNode[] = [],
      frag: string = '';

    frags.map((frg: string, index: number) => {

      frag = `${frag}${frg}`;
      node = nodes.find((value: MenuItemNode) => value.path === frag);

      if(!node) {
        return;
      }

      currentNodes.unshift(node);

      if(!node.children) {
        return;
      }

      nodes = node.children;
    });

    return currentNodes;
  }
}
