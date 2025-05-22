import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainreportpagetesterComponent } from './mainreportpagetester.component';

describe('MainreportpagetesterComponent', () => {
  let component: MainreportpagetesterComponent;
  let fixture: ComponentFixture<MainreportpagetesterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainreportpagetesterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainreportpagetesterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
