import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BugListProjectComponent } from './bug-list-project.component';

describe('BugListProjectComponent', () => {
  let component: BugListProjectComponent;
  let fixture: ComponentFixture<BugListProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BugListProjectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BugListProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
