import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminService, Project, User } from '../../../admin.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule, MatTable } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { bug, ManagerService, project_team } from '../../../manager.service';
import { AuthService } from '../../../auth.service';
import { catchError, forkJoin, of } from 'rxjs';

@Component({
  selector: 'app-mainreportmanager-page',
  imports: [MatFormFieldModule, MatCardModule, MatButtonModule, CommonModule, FormsModule, MatTableModule, MatTable, MatIconModule, RouterModule, MatInputModule],
  templateUrl: './mainreportmanager-page.component.html',
  styleUrl: './mainreportmanager-page.component.css'
})
export class MainreportmanagerPageComponent {
  displayedColumns: string[] = ['teamid', 'projectid','projectname', 'userid', 'username', 'userrole', 'bugs_assigned'];

  users: User[] = [];
  allUsers: User[] = [];
  managerid: String | null = "";
  projectid : number = 0;
    allteamMembers : project_team[] = [];
    teamMembers:project_team[] = [];
  constructor(private dialog: MatDialog, private authService: AuthService, private managerService: ManagerService, private adminService: AdminService) { }

  ngOnInit() {
    this.managerid = this.authService.getUserId()

    this.managerService.getProjectByManager(Number(this.managerid)).subscribe((projects) => {
      // console.log("Fetched projects:", projects);
      if (!projects?.length) {
        console.warn("No projects found for this manager!");
        return;
      }
      this.projectid = projects[0].id; // Keep this for reference
      this.onLoadMembers(projects); // Pass all projects to the method
    });
    
    this.loadBugs();

  }

  // Fetch users from backend
  // onLoadMembers(){
  //   console.log(this.projectid)
  //   this.managerService.getTeamMembersByProject(this.projectid).subscribe({
  //     next: (data) => {
  //       this.teamMembers = data;
  //       console.log("kdfladjfksdfhsldkfadl")
  //       console.log('Fetched team members:', this.teamMembers);
  //     },
  //     error: (err) => {
  //       console.error('Error fetching projects:', err);
  //     }
  //   });
  // }

  // onLoadMembers(projects: Project[]) {
  //   this.teamMembers = []; // Reset before fetching new data
  
  //   const teamRequests = projects.map((project) =>
  //     this.managerService.getTeamMembersByProject(project.id)
  //   );
  
  //   forkJoin(teamRequests).subscribe({
  //     next: (teamsArray) => {
  //       this.teamMembers = teamsArray.flat(); // Merge all teams into one array
  //       console.log("Fetched all team members:", this.teamMembers);
  //     },
  //     error: (err) => {
  //       console.error("Error fetching team members:", err);
  //     },
  //   });
  // }


  onLoadMembers(projects: Project[]) {
    this.allteamMembers = []; // Reset before fetching new data
  
    const teamRequests = projects.map((project) =>
      this.managerService.getTeamMembersByProject(project.id).pipe(
        catchError(() => of([])) // Ensure an empty array if there's an error or no members
      )
    );
  
    forkJoin(teamRequests).subscribe({
      next: (teamsArray) => {
        this.allteamMembers = teamsArray.flat(); // Merge all teams into one array
        console.log("Fetched all team members:", this.allteamMembers);
        

      },
      error: (err) => {
        console.error("Error fetching team members:", err);
      },
    });
  }
  
  displayedBugColumns: string[] = ['id', 'projectid', 'title', 'description', 'priority', 'status', 'created', 'updated', 'reportedBy', 'assignedTo'];

  bugs: bug[] = [];
  allBugs: bug[] = [];



  // Fetch users from backend
  loadBugs() {
    this.managerService.getBugsByManagerId(Number(this.managerid)).subscribe((data) => {
      this.allBugs = data;
      console.log("Fetched all Projects ", this.bugs)
      // this.projects = this.allProjects.slice(0, 2);
      this.bugs = this.allBugs
        .sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime())
        .slice(0, 4);


    });
  }

  submitSearch() {

  }

  downloadMemberReport() {
    const csvData = this.convertToCSV(this.allteamMembers);
    this.downloadFile(csvData, 'MemberReport.csv');
  }

  downloadBugReport() {
    const csvData = this.convertToCSV(this.allBugs);
    this.downloadFile(csvData, 'BugReport.csv');
  }

  // convertToCSV(data: any[]): string {
  //   if (!data || data.length === 0) {
  //     return '';
  //   }

  //   const headers = Object.keys(data[0]).join(','); // Extract headers
  //   const rows = data.map(row => Object.values(row).join(',')); // Extract row values

  //   return [headers, ...rows].join('\n'); // Combine headers and rows
  // }



  convertToCSV(data: any[]): string {
    if (!data || data.length === 0) {
      return '';
    }

    // Extract headers, handling nested objects
    const headers = Object.keys(data[0]).map(key => {
      const value = data[0][key];
      return (typeof value === 'object' && value !== null) ? `${key}_id` : key;
    }).join(',');

    // Extract data rows
    const rows = data.map(row =>
      Object.keys(row).map(key => {
        const value = row[key];

        // Handle objects (like assigned_project_manager_id)
        if (typeof value === 'object' && value !== null) {
          return value.hasOwnProperty('username') ? value.username : ''; // Extract `userid` safely
        }

        return value;
      }).join(',')
    );

    return [headers, ...rows].join('\n');
  }


  downloadFile(data: string, filename: string) {
    const blob = new Blob([data], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();

    window.URL.revokeObjectURL(url);
  }
}
