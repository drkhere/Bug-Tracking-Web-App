import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainreportmanagerPageComponent } from './mainreportmanager-page.component';

describe('MainreportmanagerPageComponent', () => {
  let component: MainreportmanagerPageComponent;
  let fixture: ComponentFixture<MainreportmanagerPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainreportmanagerPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainreportmanagerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
