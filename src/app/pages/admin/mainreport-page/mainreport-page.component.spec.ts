import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainreportPageComponent } from './mainreport-page.component';

describe('MainreportPageComponent', () => {
  let component: MainreportPageComponent;
  let fixture: ComponentFixture<MainreportPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainreportPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainreportPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
