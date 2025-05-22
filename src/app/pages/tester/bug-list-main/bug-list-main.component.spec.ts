import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BugListMainComponent } from './bug-list-main.component';

describe('BugListMainComponent', () => {
  let component: BugListMainComponent;
  let fixture: ComponentFixture<BugListMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BugListMainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BugListMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
