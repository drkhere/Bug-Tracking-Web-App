import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssigendBugsComponent } from './assigend-bugs.component';

describe('AssigendBugsComponent', () => {
  let component: AssigendBugsComponent;
  let fixture: ComponentFixture<AssigendBugsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssigendBugsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssigendBugsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
