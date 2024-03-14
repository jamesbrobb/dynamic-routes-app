import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import {NgForOf, NgIf} from "@angular/common";
import {GuardTypePipe, toWordsPipe} from "@jamesbenrobb/ui";

import {MenuItemNode} from "../../core/menu/menu-config";


@Component({
  selector: 'jbr-dra-breadcrumbs',
  standalone: true,
  imports: [
    NgForOf,
    GuardTypePipe,
    NgIf,
    toWordsPipe
  ],
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BreadcrumbsComponent {

  @Input({required: true}) menuItemNodes?: MenuItemNode[];
  @Output() breadCrumbSelected = new EventEmitter<MenuItemNode>()

  selectNode(node: MenuItemNode) {
    this.breadCrumbSelected.emit(node);
  }
}
