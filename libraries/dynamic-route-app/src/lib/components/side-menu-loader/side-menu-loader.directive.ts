import {DestroyRef, Directive, EventEmitter, inject, Input, Output} from "@angular/core";
import {ComponentLoaderDirective, ComponentLoaderIOBase} from "@jamesbenrobb/ui";
import {MenuItemNode} from "../../config/menu/menu-config";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {tap} from "rxjs";


export interface SideMenuComponentIO {
  menuNodes?: MenuItemNode[];
  currentNodes?: MenuItemNode[];
  nodeSelected: EventEmitter<MenuItemNode>;
}

export const DEFAULT_SIDE_MENU_COMPONENT = 'default-side-menu';


@Directive({
  selector: '[sideMenuLoader]',
  standalone: true,
  hostDirectives: [{
    directive: ComponentLoaderDirective,
    inputs: ['componentLoader:sideMenuLoader']
  }]
})
export class SideMenuLoaderDirective extends ComponentLoaderIOBase<SideMenuComponentIO> implements SideMenuComponentIO {

  @Input() menuNodes?: MenuItemNode[];
  @Input() currentNodes?: MenuItemNode[];
  @Output() nodeSelected = new EventEmitter<MenuItemNode>();

  readonly #destroyRef = inject(DestroyRef);

  constructor() {
    super();

    this.loader.componentLoaded
      .pipe(takeUntilDestroyed())
      .subscribe(({success, type}) => {
        if(!success && type !== DEFAULT_SIDE_MENU_COMPONENT) {
          this.loadComponent(DEFAULT_SIDE_MENU_COMPONENT);
        }
      });
  }

  protected override setUpInstance(): void {

    if(!this.instance) {
      return;
    }

    this.instance.instance.nodeSelected.pipe(
      takeUntilDestroyed(this.#destroyRef),
      tap(value => this.nodeSelected.emit(value))
    ).subscribe();
  }

  protected override updateInstanceInputs(): void {

    if(!this.instance) {
      return;
    }

    this.instance.setInput('menuNodes', this.menuNodes);
    this.instance.setInput('currentNodes', this.currentNodes);
  }

  protected override cleanUpInstance(): void {}
}
