import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule, MatTable } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { catchError, of, forkJoin } from 'rxjs';
import { User, AdminService, Project } from '../../../admin.service';
import { AuthService } from '../../../auth.service';
import { project_team, ManagerService, bug } from '../../../manager.service';
import { DeveloperService } from '../../../developer.service';

@Component({
  selector: 'app-mainreportpagedeveloper',
  imports: [MatFormFieldModule, MatCardModule, MatButtonModule, CommonModule, FormsModule, MatTableModule, MatTable, MatIconModule, RouterModule, MatInputModule],
  templateUrl: './mainreportpagedeveloper.component.html',
  styleUrl: './mainreportpagedeveloper.component.css'
})
export class MainreportpagedeveloperComponent {
displayedColumns: string[] = ['teamid', 'projectid','projectname', 'userid', 'username', 'userrole', 'bugs_assigned'];

  userid: String | null = "";
  // projectid : number = 0;
  
  constructor(private dialog: MatDialog, private authService: AuthService, private managerService: ManagerService, private developerService: DeveloperService) { }

  ngOnInit() {
    this.userid = this.authService.getUserId()
    
    this.loadBugs();

  }
  
  displayedBugColumns: string[] = ['id', 'projectid', 'title', 'description', 'priority', 'status', 'created', 'updated', 'reportedBy', 'assignedTo'];

  bugs: bug[] = [];
  allBugs: bug[] = [];



  // Fetch users from backend
  loadBugs() {
    this.developerService.getBugsByUserid(Number(this.userid)).subscribe((data) => {
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
