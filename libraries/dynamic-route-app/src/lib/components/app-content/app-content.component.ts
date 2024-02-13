import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {JsonPipe} from "@angular/common";
import {ContentNodeContentType, RouteNode} from "../../route";
import {ContentLoaderComponentIO} from "../app-content-loader/app-content-loader.directive";


@Component({
  selector: 'jbr-dra-default-app-content',
  standalone: true,
  imports: [
    JsonPipe
  ],
  templateUrl: './app-content.component.html',
  styleUrl: './app-content.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DefaultAppContentComponent<T extends ContentNodeContentType> implements ContentLoaderComponentIO<T> {
  @Input() routeNodes?: RouteNode<T>[];
}
