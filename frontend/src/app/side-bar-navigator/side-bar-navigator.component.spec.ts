import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideBarNavigatorComponent } from './side-bar-navigator.component';

describe('SideBarNavigatorComponent', () => {
  let component: SideBarNavigatorComponent;
  let fixture: ComponentFixture<SideBarNavigatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideBarNavigatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideBarNavigatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
