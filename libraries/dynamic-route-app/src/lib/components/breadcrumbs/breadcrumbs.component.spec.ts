import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreadcrumbsComponent } from './breadcrumbs.component';

describe('BreadcrumbsComponent', () => {
  let component: BreadcrumbsComponent<any>;
  let fixture: ComponentFixture<BreadcrumbsComponent<any>>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BreadcrumbsComponent]
    });
    fixture = TestBed.createComponent(BreadcrumbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
