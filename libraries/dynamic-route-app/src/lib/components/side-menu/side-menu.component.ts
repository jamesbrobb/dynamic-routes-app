import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, EventEmitter,
  inject,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';

import {NgClass} from "@angular/common";
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeModule, MatTreeNestedDataSource} from '@angular/material/tree';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";

import {openClose, rotate} from "@jamesbenrobb/ui";


import {SideMenuComponentIO} from "../side-menu-loader/side-menu-loader.directive";
import {MenuItemNode} from "../../core";


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
export class SideMenuComponent implements OnChanges, SideMenuComponentIO {

  @Input() menuNodes?: MenuItemNode[];
  @Input() currentNodes?: MenuItemNode[];

  @Output() nodeSelected = new EventEmitter<MenuItemNode>();

  #changeDetectorRef = inject(ChangeDetectorRef);

  #currentNodes?: MenuItemNode[];

  readonly treeControl = new NestedTreeControl<MenuItemNode>(node => node.children);
  readonly dataSource = new MatTreeNestedDataSource<MenuItemNode>();

  readonly hasChild = (_: number, node: MenuItemNode) => !!node.children && node.children.length > 0;

  ngOnChanges(changes: SimpleChanges) {
    if(changes['menuNodes']) {
      const nodes: MenuItemNode[] = changes['menuNodes'].currentValue || [];
      this.dataSource.data = nodes;
      this.treeControl.dataNodes = nodes;
    }
    if(changes['currentNodes']) {
      this.#currentNodesUpdated(changes['currentNodes'].currentValue || []);
    }
  }

  #currentNodesUpdated(nodes: MenuItemNode[]): void {

    this.#setExpanded(nodes);
    this.#setActive(nodes);

    this.#currentNodes = nodes;
    this.#changeDetectorRef.detectChanges();
  }

  onItemClick(node: MenuItemNode): void {
    this.nodeSelected.emit(node);
  }

  onGroupClick(node: MenuItemNode): void {

    if(!node.hasContent) {
      return;
    }

    this.nodeSelected.emit(node);
  }

  toggleGroup(node: MenuItemNode): void {
    this.treeControl.toggle(node);
  }

  #setExpanded(nodes: MenuItemNode[]): void {

    nodes.forEach((node, index) => {

      if(index === 0) {

        if(!node.children) {
          return;
        }

        if(this.#currentNodes && this.#currentNodes.indexOf(node) !== -1) {

          if(this.treeControl.isExpanded(node)) {
            this.treeControl.collapse(node);
          }

        } else {

          if(!this.treeControl.isExpanded(node)) {
            this.treeControl.expand(node);
          }
        }

        return;
      }

      if(!this.treeControl.isExpanded(node)){
        this.treeControl.expand(node);
      }
    });

    if(this.#currentNodes) {
      this.#currentNodes
        .filter((node) => !nodes.find((nd) => nd === node))
        .forEach((node) => {
          this.treeControl.collapse(node);
        });
    }
  }

  #setActive(nodes: MenuItemNode[]): void {

    if(this.#currentNodes) {
      this.#currentNodes.forEach((node) => {
        node.active = 0;
      });
    }

    nodes.forEach((node, index) => {
      node.active = Math.min(index + 1, 2);
    });
  }
}
