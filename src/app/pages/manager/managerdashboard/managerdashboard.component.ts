import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User, AdminService, Project } from '../../../admin.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule, MatTable } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { MatFormField } from '@angular/material/form-field';
import { bug, ManagerService } from '../../../manager.service';
import { AuthService } from '../../../auth.service';
import { catchError, forkJoin, Observable, of } from 'rxjs';

@Component({
  selector: 'app-managerdashboard',
  imports: [MatCardModule, MatButtonModule,CommonModule, FormsModule, MatTableModule, MatTable, MatIconModule,RouterModule,CommonModule],
  templateUrl: './managerdashboard.component.html',
  styleUrl: './managerdashboard.component.css'
})
export class ManagerdashboardComponent {
  displayedBugColumnsApproaching: string[] = ['id', 'projectid', 'title', 'description', 'priority', 'status', 'created', 'updated', 'reportedBy', 'assignedTo'];

  approachBugs: bug[] = [];
  allApproachBugs : bug[] = [];
  managerid:String|null = "";
  projectCount:number=0;
  bugCount:Number=0;
  activeBugCount:Number=0;
  constructor(private authService :  AuthService,private dialog: MatDialog,private adminService: AdminService,private managerService :ManagerService) { }

  ngOnInit() {
    this.managerid = this.authService.getUserId()
    this.loadApproachingBugs();
    this.loadBugs();
    this.managerService.getProjectCount(Number(this.managerid)).subscribe(data =>{
      this.projectCount = data
      console.log(this.projectCount)
    });



    //Bug Count
    this.managerService.getProjectByManager(Number(this.managerid)).subscribe((projects: Project[]) => {
      console.log("Projects:", projects);
      if (!projects || projects.length === 0) {
        this.bugCount = 0; // Ensure it's a valid number
        return;
      }
      // Array of observables fetching bug counts
      const bugCountRequests: Observable<number>[] = projects.map((project: Project) =>
        this.managerService.getBugCount(project.id).pipe(
          catchError(() => of(0)) // Return 0 on error to prevent failure
        )
      );
    
      // Execute all requests in parallel
      forkJoin(bugCountRequests).subscribe((counts: number[]) => {
        this.bugCount = counts.reduce((sum: number, count: number) => sum + count, 0); // Sum bug counts
        console.log("Total Bug Count:", this.bugCount);
      });
    });
    
    
    //Active Bug Count
      
    this.managerService.getProjectByManager(Number(this.managerid)).subscribe((projects: Project[]) => {
      console.log("Projects:", projects);
      if (!projects || projects.length === 0) {
        this.bugCount = 0; // Ensure it's a valid number
        return;
      }
      // Array of observables fetching bug counts
      const bugCountRequests: Observable<number>[] = projects.map((project: Project) =>
        this.managerService.getActiveBugCount(project.id).pipe(
          catchError(() => of(0)) // Return 0 on error to prevent failure
        )
      );
    
      // Execute all requests in parallel
      forkJoin(bugCountRequests).subscribe((counts: number[]) => {
        this.activeBugCount = counts.reduce((sum: number, count: number) => sum + count, 0); // Sum bug counts
        console.log("Total Active Bug Count:", this.activeBugCount);
      });
    });
    
  }

  // Fetch users from backend
  // loadApproachingBugs() {
  //     this.managerService.getBugsByManagerIdSorted(Number(this.managerid),'asc').subscribe((data) => {
  //       this.allApproachBugs = data;
  //       console.log("Fetched all Approached Bugs ",this.allApproachBugs)
  //       this.approachBugs = this.allApproachBugs.slice(0, 4);
  //   //     this.approachBugs = this.allApproachBugs
  //   // .sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime())
  //   // .slice(0, 2);


  //     });
  //   }

  loadApproachingBugs() {
    this.managerService.getBugsByManagerIdSorted(Number(this.managerid), 'asc').subscribe((data) => {
      this.allApproachBugs = data.filter(bug => bug.status.toLowerCase() !== 'closed'); // Exclude closed bugs
      console.log("Fetched all Approached Bugs (excluding closed):", this.allApproachBugs);
      
      this.approachBugs = this.allApproachBugs.slice(0, 4); // Keep only the top 4
    });
  }




  displayedBugColumns: string[] = ['id', 'projectid', 'title', 'description', 'priority', 'status', 'created', 'updated', 'reportedBy', 'assignedTo'];
  
    bugs: bug[] =[];
    allBugs : bug[] = [];
  

  
    // Fetch users from backend
    loadBugs() {
      this.managerService.getBugsByManagerId(Number(this.managerid)).subscribe((data) => {
        this.allBugs = data;
        console.log("Fetched all Projects ",this.bugs)
        // this.projects = this.allProjects.slice(0, 2);
        this.bugs = this.allBugs
    .sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime())
    .slice(0, 4);


      });
    }
}
