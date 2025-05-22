import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdationPageComponent } from './updation-page.component';

describe('UpdationPageComponent', () => {
  let component: UpdationPageComponent;
  let fixture: ComponentFixture<UpdationPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdationPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
