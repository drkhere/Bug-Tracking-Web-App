import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule, MatTable } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { Observable, catchError, of, forkJoin } from 'rxjs';
import { AdminService, Project } from '../../../admin.service';
import { AuthService } from '../../../auth.service';
import { bug, ManagerService } from '../../../manager.service';
import { DeveloperService } from '../../../developer.service';

@Component({
  selector: 'app-developerdashboard',
  imports: [MatCardModule, MatButtonModule, CommonModule, FormsModule, MatTableModule, MatTable, MatIconModule, RouterModule, CommonModule],
  templateUrl: './developerdashboard.component.html',
  styleUrl: './developerdashboard.component.css'
})
export class DeveloperdashboardComponent {
  displayedBugColumnsApproaching: string[] = ['id', 'projectid', 'title', 'description', 'priority', 'status', 'created', 'updated', 'reportedBy', 'assignedTo'];

  approachBugs: bug[] = [];
  allApproachBugs: bug[] = [];
  developerid: String | null = "";
  projectCount: number = 0;
  bugCount: Number = 0;
  activeBugCount: Number = 0;
  constructor(private authService: AuthService, private dialog: MatDialog, private developerService: DeveloperService, private managerService: ManagerService) { }

  ngOnInit() {
    this.developerid = this.authService.getUserId()
    console.log("The developer id :", this.developerid)
    this.loadApproachingBugs();
    this.loadBugs();
    this.developerService.getProjectCountByUserId(Number(this.developerid)).subscribe(data => {
      this.projectCount = data
      console.log("Project Count ", this.projectCount)
    });



    //Bug Count
    this.developerService.getBugCountByUserid(Number(this.developerid)).subscribe(count => {
      console.log("count ",count)
      this.bugCount = count;
    })


    //Active Bug Count

    this.developerService.getActiveBugCount(Number(this.developerid)).subscribe(activecount => {
      this.activeBugCount = activecount;
      console.log("Active Bug Count  ", this.activeBugCount)
    })

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
    this.developerService.getBugsByUserIdSorted(Number(this.developerid), 'asc').subscribe((data) => {
      console.log("Approaching ", data)
      this.allApproachBugs = data.filter(bug => bug.status.toLowerCase() !== 'closed'); // Exclude closed bugs
      console.log("Fetched all Approached Bugs (excluding closed):", this.allApproachBugs);
      this.approachBugs = this.allApproachBugs.slice(0, 4); // Keep only the top 4
    });
  }




  displayedBugColumns: string[] = ['id', 'projectid', 'title', 'description', 'priority', 'status', 'created', 'updated', 'reportedBy', 'assignedTo'];

  bugs: bug[] = [];
  allBugs: bug[] = [];



  // Fetch users from backend
  loadBugs() {
    this.developerService.getBugsByUserid(Number(this.developerid)).subscribe((data) => {
      this.allBugs = data;
      console.log("Fetched all Projects ", this.bugs)
      // this.projects = this.allProjects.slice(0, 2);
      this.bugs = this.allBugs
        .sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime())
        .slice(0, 4);


    });
  }
}
