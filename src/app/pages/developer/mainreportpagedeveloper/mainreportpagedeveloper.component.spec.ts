import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainreportpagedeveloperComponent } from './mainreportpagedeveloper.component';

describe('MainreportpagedeveloperComponent', () => {
  let component: MainreportpagedeveloperComponent;
  let fixture: ComponentFixture<MainreportpagedeveloperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainreportpagedeveloperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainreportpagedeveloperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
