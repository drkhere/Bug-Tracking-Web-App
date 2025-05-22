import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BugProjectListComponent } from './bug-project-list.component';

describe('BugProjectListComponent', () => {
  let component: BugProjectListComponent;
  let fixture: ComponentFixture<BugProjectListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BugProjectListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BugProjectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
