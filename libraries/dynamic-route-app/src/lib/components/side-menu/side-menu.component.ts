import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  Inject
} from '@angular/core';

import {NgClass} from "@angular/common";
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeModule, MatTreeNestedDataSource} from '@angular/material/tree';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";

import {openClose, rotate} from "@jamesbenrobb/ui";

import {MenuConfig, MenuItemNode} from "../../config/menu/menu-config";
import {MenuConfigService} from "../../config/menu/menu.providers";
import {RouteManager} from "../../route";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";


@Component({
  selector: 'jbr-dra-side-menu',
  standalone: true,
  imports: [
    MatIconModule,
    MatTreeModule,
    MatButtonModule,
    MatIconModule,
    NgClass
  ],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    openClose({timings: '0.3s'}),
    rotate()
  ]
})
export class SideMenuComponent {

  #changeDetectorRef = inject(ChangeDetectorRef);
  #routeManager = inject(RouteManager);

  #currentNodes?: MenuItemNode[];

  readonly treeControl = new NestedTreeControl<MenuItemNode>(node => node.children);
  readonly dataSource = new MatTreeNestedDataSource<MenuItemNode>();

  readonly hasChild = (_: number, node: MenuItemNode) => !!node.children && node.children.length > 0;

  constructor(@Inject(MenuConfigService) config: MenuConfig) {
    this.dataSource.data = config;
    this.treeControl.dataNodes = config;

    this.#routeManager.urlChange$
      .pipe(takeUntilDestroyed())
      .subscribe((url) => {
        this.#onUrlUpdate(url);
      });
  }

  #onUrlUpdate(url: string): void {

    if(!url) {
      return;
    }

    const nodes: MenuItemNode[] = this.#getCurrentNodes(url);

    this.#setExpanded(nodes);
    this.#setActive(nodes);

    this.#currentNodes = nodes;
    this.#changeDetectorRef.detectChanges();
  }

  onItemClick(node: MenuItemNode): void {
    this.#routeManager.navigateByUrl(node.path);
  }

  onGroupClick(node: MenuItemNode): void {

    if(!this.treeControl.isExpanded(node)) {
      this.treeControl.collapseDescendants(node);
    }

    if(!node.hasContent) {
      return;
    }

    this.#routeManager.navigateByUrl(node.path);
  }

  #getCurrentNodes(url: string): MenuItemNode[] {

    const frags: string[] = url.split(/(?=\/)/)
      .filter(value => !!value);

    let node: MenuItemNode | undefined,
      nodes: MenuItemNode[] = this.treeControl.dataNodes,
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

  #setExpanded(nodes: MenuItemNode[]): void {

    if(this.#currentNodes) {
      this.#currentNodes
        .filter((node) => !nodes.find((nd) => nd === node))
        .forEach((node) => {
          this.treeControl.collapse(node);
        });
    }

    nodes.forEach((node) => {
      if(!this.treeControl.isExpanded(node)){
        this.treeControl.expand(node);
      }
    })
  }

  #setActive(nodes: MenuItemNode[]): void {

    if(this.#currentNodes) {
      this.#currentNodes.forEach((node) => {
        node.active = 0;
      })
    }

    nodes.reverse().forEach((node, index) => {
      node.active = index + 1;
    })
  }
}
