import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule, MatTable } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { User, AdminService, Project } from '../../../admin.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-mainreport-page',
  imports: [MatFormFieldModule,MatCardModule, MatButtonModule,CommonModule, FormsModule, MatTableModule, MatTable, MatIconModule,RouterModule,MatInputModule],
  templateUrl: './mainreport-page.component.html',
  styleUrl: './mainreport-page.component.css'
})
export class MainreportPageComponent {
displayedColumns: string[] = ['id', 'username', 'firstname', 'email', 'role', 'status', 'created', 'updated']; // Must match `matColumnDef`

  users: User[] = [];
  allUsers : User[] = [];
  constructor(private dialog: MatDialog,private adminService: AdminService) { }

  ngOnInit() {
    this.loadUsers();
    this.loadProjects();

  }

  // Fetch users from backend
  loadUsers() {
    this.adminService.getUsers().subscribe((data) => {
      this.allUsers = data;
      console.log(this.users)
      this.users = this.allUsers
      .sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime())
      .slice(0, 2);

    });
  }




  displayedColumnsProject: string[] = ['id', 'project_name','manager','start_date','end_date','status','created','updated']; // Must match `matColumnDef`
  
    projects: Project[] =[];
    allProjects : Project[] = [];
  

  
    // Fetch users from backend
    loadProjects() {
      this.adminService.getProjects().subscribe((data) => {
        this.allProjects = data;
        console.log("Fetched all Projects ",this.projects)
        // this.projects = this.allProjects.slice(0, 2);
        this.projects = this.allProjects
    .sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime())
    .slice(0, 2);


      });
    }

    submitSearch(){

    }

    downloadUserReport() {
      const csvData = this.convertToCSV(this.allUsers);
      this.downloadFile(csvData, 'UserReport.csv');
    }
    
    downloadProjectReport() {
      const csvData = this.convertToCSV(this.allProjects);
      this.downloadFile(csvData, 'ProjectReport.csv');
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
