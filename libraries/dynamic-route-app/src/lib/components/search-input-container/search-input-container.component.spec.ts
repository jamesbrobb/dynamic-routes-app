import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchInputContainerComponent } from './search-input-container.component';

describe('SearchInputContainerComponent', () => {
  let component: SearchInputContainerComponent;
  let fixture: ComponentFixture<SearchInputContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchInputContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchInputContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
