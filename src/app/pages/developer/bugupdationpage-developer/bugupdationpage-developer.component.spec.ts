import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BugupdationpageDeveloperComponent } from './bugupdationpage-developer.component';

describe('BugupdationpageDeveloperComponent', () => {
  let component: BugupdationpageDeveloperComponent;
  let fixture: ComponentFixture<BugupdationpageDeveloperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BugupdationpageDeveloperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BugupdationpageDeveloperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
