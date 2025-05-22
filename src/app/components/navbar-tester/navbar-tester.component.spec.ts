import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarTesterComponent } from './navbar-tester.component';

describe('NavbarTesterComponent', () => {
  let component: NavbarTesterComponent;
  let fixture: ComponentFixture<NavbarTesterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarTesterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarTesterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
