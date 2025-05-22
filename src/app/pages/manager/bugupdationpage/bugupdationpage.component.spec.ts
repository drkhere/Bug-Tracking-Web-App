import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BugupdationpageComponent } from './bugupdationpage.component';

describe('BugupdationpageComponent', () => {
  let component: BugupdationpageComponent;
  let fixture: ComponentFixture<BugupdationpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BugupdationpageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BugupdationpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
