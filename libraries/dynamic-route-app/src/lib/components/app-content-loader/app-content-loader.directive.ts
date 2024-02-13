import {DestroyRef, Directive, EventEmitter, inject, Input, Output} from "@angular/core";
import {ComponentLoaderDirective, ComponentLoaderIOBase} from "@jamesbenrobb/ui";
import {ContentNodeContentType, RouteNode} from "../../route";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";


export type ContentLoaderComponentIO<T extends ContentNodeContentType> = {
  routeNodes?: RouteNode<T>[]
  routeSelected?: EventEmitter<RouteNode<T>>
}

export const DEFAULT_CONTENT_LOADER_COMPONENT = 'default-app-content';


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

  readonly #destroyRef = inject(DestroyRef);

  constructor() {
    super();

    this.loader.componentLoaded
      .pipe(takeUntilDestroyed())
      .subscribe(({success, type}) => {
        if(!success && type !== DEFAULT_CONTENT_LOADER_COMPONENT) {
          this.loadComponent(DEFAULT_CONTENT_LOADER_COMPONENT);
        }
      });
  }

  protected override setUpInstance(): void {
    if(!this.instance) {
      return;
    }
    if(!this.instance.instance.routeSelected) {
      return;
    }
    this.instance.instance.routeSelected
      .pipe(takeUntilDestroyed(this.#destroyRef))
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