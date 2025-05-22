import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { User, AdminService, Project } from '../../../admin.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule, MatTable } from '@angular/material/table';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [MatCardModule, MatButtonModule,CommonModule, FormsModule, MatTableModule, MatTable, MatIconModule,RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  displayedColumns: string[] = ['id', 'username', 'firstname', 'email', 'role', 'status', 'created', 'updated']; // Must match `matColumnDef`

  users: User[] = [];
  allUsers : User[] = [];
  userCount:Number=0;
  projectCount:Number=0;
  activeProjectCont:Number=0;
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

    this.adminService.getUserCount().subscribe(data=>{
      this.userCount=data;
      console.log(this.userCount)
    })

    this.adminService.getProjectCount().subscribe(data=>{
      this.projectCount=data;
      console.log(this.projectCount)
    })
    this.adminService.getActiveProjectCount().subscribe(data=>{
      this.activeProjectCont=data;
      console.log(this.activeProjectCont)
    })
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
}
