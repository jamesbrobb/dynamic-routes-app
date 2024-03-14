import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreadcrumbsContainerComponent } from './breadcrumbs-container.component';

describe('BreadcrumbsContainerComponent', () => {
  let component: BreadcrumbsContainerComponent;
  let fixture: ComponentFixture<BreadcrumbsContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreadcrumbsContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BreadcrumbsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
