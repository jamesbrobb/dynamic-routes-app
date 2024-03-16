import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RootRouteComponent } from './root-route.component';

describe('RootRouteComponent', () => {
  let component: RootRouteComponent;
  let fixture: ComponentFixture<RootRouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RootRouteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RootRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
