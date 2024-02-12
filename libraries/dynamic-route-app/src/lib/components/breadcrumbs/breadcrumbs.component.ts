import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import {NgForOf, NgIf} from "@angular/common";
import {GuardTypePipe, toWordsPipe} from "@jamesbenrobb/ui";

import {RouteNode, isContentNode, ContentNodeContentType} from "../../route";


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
export class BreadcrumbsComponent<T extends ContentNodeContentType> {

  @Input({required: true}) routeNodes?: RouteNode<T>[];
  @Output() breadCrumbSelected = new EventEmitter<RouteNode<T>>()

  isContentNode = isContentNode;

  selectNode(node: RouteNode<T>) {
    this.breadCrumbSelected.emit(node);
  }
}
