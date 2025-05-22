import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectTeamMembrListComponent } from './project-team-membr-list.component';

describe('ProjectTeamMembrListComponent', () => {
  let component: ProjectTeamMembrListComponent;
  let fixture: ComponentFixture<ProjectTeamMembrListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectTeamMembrListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectTeamMembrListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
