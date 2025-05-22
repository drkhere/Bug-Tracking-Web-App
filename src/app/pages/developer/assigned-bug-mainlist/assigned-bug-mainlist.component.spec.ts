import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedBugMainlistComponent } from './assigned-bug-mainlist.component';

describe('AssignedBugMainlistComponent', () => {
  let component: AssignedBugMainlistComponent;
  let fixture: ComponentFixture<AssignedBugMainlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignedBugMainlistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignedBugMainlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
