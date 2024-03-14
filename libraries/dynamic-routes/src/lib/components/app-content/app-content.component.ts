import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {JsonPipe} from "@angular/common";
import {MatDivider} from "@angular/material/divider";

import {ContentNode, ContentNodeContentType, RouteNode} from "../../core";
import {ContentLoaderComponentIO} from "../app-content-loader/app-content-loader.directive";
import {DebugPanelComponent} from "../debug-panel/debug-panel.component";


@Component({
  selector: 'jbr-dra-default-app-content',
  standalone: true,
  imports: [
    JsonPipe,
    MatDivider,
    DebugPanelComponent
  ],
  templateUrl: './app-content.component.html',
  styleUrl: './app-content.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DefaultAppContentComponent<T extends ContentNodeContentType> implements ContentLoaderComponentIO<T> {
  @Input() routeNodes: RouteNode<T>[] | undefined;
  @Input() currentNode: ContentNode<T> | undefined
  @Input() currentContent: T | undefined
}
