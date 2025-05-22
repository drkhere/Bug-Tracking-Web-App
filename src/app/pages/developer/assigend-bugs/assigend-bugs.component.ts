import { Component } from '@angular/core';
import { DeveloperService } from '../../../developer.service';
import { FormsModule } from '@angular/forms';
import { MatTable, MatTableModule } from '@angular/material/table';
import { setAlternateWeakRefImpl } from '@angular/core/primitives/signals';
import { MatIconModule } from '@angular/material/icon';
import { ManagerService, project_bug } from '../../../manager.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-assigend-bugs',
  imports: [CommonModule,FormsModule,MatTable,MatIconModule,MatTableModule,RouterModule],
  templateUrl: './assigend-bugs.component.html',
  styleUrl: './assigend-bugs.component.css'
})
export class AssigendBugsComponent {

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
  
    // this.router.navigate(['/bugs/developer/user/', userid, 'project', projectid], { 
    //   state: { project_name: projectName } 
    // });

    this.router.navigate(['/bugs/developer/user/', userid, 'project', projectid]);
  }
}
