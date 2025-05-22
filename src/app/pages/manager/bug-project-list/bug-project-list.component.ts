import { Component } from '@angular/core';
import { AdminService, Project } from '../../../admin.service';
import { CommonModule } from '@angular/common'; // Import this
import { FormsModule } from '@angular/forms';
import { MatTable, MatTableModule } from '@angular/material/table';
import { setAlternateWeakRefImpl } from '@angular/core/primitives/signals';
import { MatIconModule } from '@angular/material/icon';
import { ManagerService, project_bug } from '../../../manager.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bug-project-list',
  imports: [CommonModule,FormsModule,MatTable,MatIconModule,MatTableModule],
  templateUrl: './bug-project-list.component.html',
  styleUrl: './bug-project-list.component.css'
})
export class BugProjectListComponent {
  displayedColumns: string[] = ['id', 'project_name','status','manager','total_bugs'];


  projects: project_bug[] = [];
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
    this.managerService.getProjectsWithBugCounts(this.managerId).subscribe({
      next: (data) => {
        this.projects = data;
        console.log("kdfladjfksdfhsldkfadl")
        console.log('Fetched Projects:', this.projects);
      },
      error: (err) => {
        console.error('Error fetching projects:', err);
      }
    });
  }

  bugPage(managerId: number, projectId: number, projectName: string) {
    console.log("Navigating to Bug Page:");
    console.log("Manager ID:", managerId);
    console.log("Project ID:", projectId);
    console.log("Project Name:", projectName);
  
    this.router.navigate(['/bugs/user', managerId, 'project', projectId], { 
      state: { project_name: projectName } 
    });
  }
  
  
  // add(){
  //   alert("Hey you are added");
  // }

  // updateUser(user: any) {
  //   alert(`Updating user: ${user.name}`);
  // }
}
