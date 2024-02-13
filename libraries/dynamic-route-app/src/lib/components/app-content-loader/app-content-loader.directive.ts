import {Directive, EventEmitter, Input, Output} from "@angular/core";
import {ComponentLoaderDirective, ComponentLoaderIOBase} from "@jamesbenrobb/ui";
import {ContentNodeContentType, RouteNode} from "../../route";


export type ContentLoaderComponentIO<T extends ContentNodeContentType> = {
  routeNodes?: RouteNode<T>[]
  routeSelected?: EventEmitter<RouteNode<T>>
}


@Directive({
  selector: '[appContentLoader]',
  standalone: true,
  hostDirectives: [{
    directive: ComponentLoaderDirective,
    inputs: ['componentLoader:appContentLoader']
  }]
})
export class AppContentLoaderDirective<T extends ContentNodeContentType> extends ComponentLoaderIOBase<ContentLoaderComponentIO<T>> implements ContentLoaderComponentIO<T>{
  @Input() routeNodes?: RouteNode<T>[];
  @Output() routeSelected = new EventEmitter<RouteNode<T>>();

  protected override setUpInstance(): void {
    if(!this.instance) {
      return;
    }
    if(!this.instance.instance.routeSelected) {
      return;
    }
    this.instance.instance.routeSelected
      .subscribe(value => this.routeSelected.emit(value));
  }

  protected override updateInstanceInputs(): void {
    if(!this.instance) {
      return;
    }
    this.instance.setInput('routeNodes', this.routeNodes);
  }

  protected override cleanUpInstance(): void {}
}
