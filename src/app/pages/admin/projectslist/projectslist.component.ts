import { Component } from '@angular/core';
import { AdminService, Project } from '../../../admin.service';

import { CommonModule } from '@angular/common'; // Import this
import { FormsModule } from '@angular/forms';
import { MatTable, MatTableModule } from '@angular/material/table';
import { setAlternateWeakRefImpl } from '@angular/core/primitives/signals';
import { MatIconModule } from '@angular/material/icon';
import { ConfirmDialogComponent } from '../../../components/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-projectslist',
  imports: [CommonModule,FormsModule,MatTable,MatTableModule,MatIconModule,RouterModule],
  templateUrl: './projectslist.component.html',
  styleUrl: './projectslist.component.css'
})
export class ProjectslistComponent {
displayedColumns: string[] = ['id', 'project_name','description','manager','start_date','end_date','status','created','updated','action']; // Must match `matColumnDef`

  projects: Project[] =[];

  constructor(private dialog: MatDialog,private adminService: AdminService) {}

  ngOnInit() {
    this.loadProjects();
  }

  // Fetch users from backend
  loadProjects() {
    this.adminService.getProjects().subscribe((data) => {
      this.projects = data;
      console.log(this.projects)
    });
  }

  // add(){
  //   alert("Hey you are added");
  // }

  // updateUser(user: any) {
  //   alert(`Updating user: ${user.name}`);
  // }

  deleteProject(userid: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.adminService.deleteProject(userid).subscribe(() => {
            // this.loadUsers();
            alert("Successfully Deleted Project");
          },
          (error) => {
            alert("Failed in Deleting User");
            console.log(error);
          }
        );
      } else {
        console.log('Deletion cancelled');
      }
    });
  }
}
