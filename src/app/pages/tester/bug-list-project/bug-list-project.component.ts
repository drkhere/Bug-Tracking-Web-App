import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatTable, MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DeveloperService } from '../../../developer.service';

@Component({
  selector: 'app-bug-list-project',
  imports: [CommonModule,FormsModule,MatTable,MatIconModule,MatTableModule,RouterModule],
  templateUrl: './bug-list-project.component.html',
  styleUrl: './bug-list-project.component.css'
})
export class BugListProjectComponent {
  displayedColumns: string[] = ['userid','projectid', 'project_name','managerid','bugsAssigned'];
  
  
    constructor(private developerService : DeveloperService,private route:ActivatedRoute,private router : Router){}
  
    userid : number =0;
    assignedProjects: any[] = [];
  
    ngOnInit(): void {
      this.route.paramMap.subscribe(params => {
        this.userid = Number(params.get('userid')); // Convert to number
        if (this.userid) {
          this.loadAssignedProjects();
        }
      });
    }
  
    loadAssignedProjects(): void {
      this.developerService.getAssignedProjectDetailsByUserId(this.userid).subscribe(
        (projects) => {
          this.assignedProjects = projects;
          console.log('Assigned Projects with Details:', this.assignedProjects);
        },
        (error) => {
          console.error('Error fetching assigned projects:', error);
        }
      );
    }
  
    bugPage(userid: number, projectid: number, projectName: string) {
      console.log("Navigating to Bug Page:");
      console.log("Manager ID:", userid);
      console.log("Project ID:", projectid);
      console.log("Project Name:", projectName);
    
      this.router.navigate(['/bugs/tester/user/', userid, 'project', projectid], { 
        state: { project_name: projectName } 
      });
    }

}
