import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppLayoutContainerComponent } from './app-layout-container.component';

describe('AppComponent', () => {
  let component: AppLayoutContainerComponent;
  let fixture: ComponentFixture<AppLayoutContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppLayoutContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppLayoutContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
