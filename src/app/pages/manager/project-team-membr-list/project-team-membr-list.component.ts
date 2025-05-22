import { Component } from '@angular/core';
import { ManagerService, project_team } from '../../../manager.service';
import { ActivatedRoute, Router } from '@angular/router';

import { CommonModule } from '@angular/common'; // Import this
import { FormsModule } from '@angular/forms';
import { MatTable, MatTableModule } from '@angular/material/table';
import { setAlternateWeakRefImpl } from '@angular/core/primitives/signals';
import { MatIconModule } from '@angular/material/icon';
import { project_bug } from '../../../manager.service';
import { RouterModule } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { User } from '../../../admin.service';
import { ConfirmDialogComponent } from '../../../components/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-project-team-membr-list',
  imports: [MatButtonModule,MatSelectModule,MatFormFieldModule,MatIconModule, MatTable, MatTableModule, RouterModule, CommonModule, FormsModule],
  templateUrl: './project-team-membr-list.component.html',
  styleUrl: './project-team-membr-list.component.css'
})
export class ProjectTeamMembrListComponent {
  displayedColumns: string[] = ['teamid', 'projectid', 'userid', 'username', 'userrole', 'bugs_assigned','action'];
  projectid : number = 0;
  teamMembers : project_team[] = [];
  projectName:String="";

  constructor(private dialog: MatDialog,private managerService:ManagerService,private route:ActivatedRoute,private router:Router){}

  ngOnInit(){
    this.route.paramMap.subscribe(params =>{
      this.projectid = Number(params.get('projectId'))
      if (this.projectid) {
        this.onLoadMembers()
        // console.log("the assigned ",this.assignedUserOptions)
      }
    })
    this.managerService.getProjectByProjectId(this.projectid).subscribe(data=>{
      this.projectName = data.project_name;
      console.log(this.projectName)
    })
    
  }

  onLoadMembers(){
    this.managerService.getTeamMembersByProject(this.projectid).subscribe({
      next: (data) => {
        this.teamMembers = data;
        console.log("kdfladjfksdfhsldkfadl")
        console.log('Fetched team members:', this.teamMembers);
      },
      error: (err) => {
        console.error('Error fetching projects:', err);
      }
    });
  }

  deleteMember(memberid: number) {
        const dialogRef = this.dialog.open(ConfirmDialogComponent);
      
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.managerService.deleteTeamMember(memberid).subscribe(() => {
                // this.loadUsers();
                alert("Successfully Deleted Member");
              },
              (error) => {
                alert("Failed in Deleting Member");
                console.log(error);
              }
            );
          } else {
            console.log('Deletion cancelled');
          }
        });
      }

}
