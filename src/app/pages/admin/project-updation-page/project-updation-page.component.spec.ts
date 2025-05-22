import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectUpdationPageComponent } from './project-updation-page.component';

describe('ProjectUpdationPageComponent', () => {
  let component: ProjectUpdationPageComponent;
  let fixture: ComponentFixture<ProjectUpdationPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectUpdationPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectUpdationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
