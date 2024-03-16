import {ChangeDetectionStrategy, Component, DestroyRef, inject, ViewChild} from '@angular/core';
import {SearchInputComponent} from "@jamesbenrobb/ui";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {debounceTime, filter, tap} from "rxjs";

@Component({
  selector: 'jbr-docs-search-input-container',
  standalone: true,
    imports: [
        SearchInputComponent
    ],
  templateUrl: './search-input-container.component.html',
  styleUrl: './search-input-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchInputContainerComponent {

  @ViewChild(SearchInputComponent, {static: true})
  searchInput?: SearchInputComponent;

  readonly #destroyRef = inject(DestroyRef);

  ngAfterViewInit() {
    this.searchInput?.value.pipe(
      filter(arg => arg.length === 0 || arg.length > 3),
      debounceTime(200),
      tap(arg => console.log(arg)),
      takeUntilDestroyed(this.#destroyRef)
    ).subscribe()
  }
}
