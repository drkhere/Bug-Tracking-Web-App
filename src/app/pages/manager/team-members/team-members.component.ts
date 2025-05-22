import { Component } from '@angular/core';
import { ManagerService, project_team_firstpage } from '../../../manager.service';
import { ActivatedRoute, Router } from '@angular/router';

import { CommonModule } from '@angular/common'; // Import this
import { FormsModule } from '@angular/forms';
import { MatTable, MatTableModule } from '@angular/material/table';
import { setAlternateWeakRefImpl } from '@angular/core/primitives/signals';
import { MatIconModule } from '@angular/material/icon';
import {  project_bug } from '../../../manager.service';
import {  RouterModule } from '@angular/router';

@Component({
  selector: 'app-team-members',
  imports: [CommonModule,FormsModule,MatTable,MatIconModule,MatTableModule],
  templateUrl: './team-members.component.html',
  styleUrl: './team-members.component.css'
})
export class TeamMembersComponent {
displayedColumns: string[] = ['project_id', 'project_name','status','manager','total_members'];


  projects: project_team_firstpage[] = [];
  managerId: number = 0; // Set a valid manager ID dynamically

  constructor(private managerService: ManagerService,private route: ActivatedRoute,private router: Router) {}

  ngOnInit() {
    // ✅ Get managerid from URL
    this.route.paramMap.subscribe(params => {
      this.managerId = Number(params.get('managerid')); // Convert to number
      if (this.managerId) {
        this.loadProjects();  // Fetch projects only if managerid exists
      }
    });
  }

  // Fetch projects from the backend
  loadProjects(): void {
    this.managerService.getProjectsWithMemberCount(this.managerId).subscribe({
      next: (data) => {
        console.log("the data team member",data)
        this.projects = data;

        // console.log("kdfladjfksdfhsldkfadl")
        // console.log('Fetched Projects:', this.projects);
      },
      error: (err) => {
        console.error('Error fetching projects:', err);
      }
    });
  }

  memberListPage(managerId: number, projectId: number, projectName: string) {
    console.log("Navigating to Bug Page:");
    console.log("Manager ID:", managerId);
    console.log("Project ID:", projectId);
    console.log("Project Name:", projectName);
  
    this.router.navigate(['/teams/user/', managerId, 'project', projectId], { 
      state: { project_name: projectName } 
    });
  }
}
