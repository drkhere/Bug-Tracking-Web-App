import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { assignedUserOptions, bug, ManagerService } from '../../../manager.service';
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
  selector: 'app-bug-list',
  imports: [MatButtonModule,MatSelectModule,MatFormFieldModule,MatIconModule, MatTable, MatTableModule, RouterModule, CommonModule, FormsModule],
  templateUrl: './bug-list.component.html',
  styleUrl: './bug-list.component.css'
})
export class BugListComponent {

  displayedColumns: string[] = ['id', 'projectid', 'title', 'description', 'priority', 'status', 'created', 'updated', 'reportedBy', 'assignedTo','action'];
  constructor(private dialog: MatDialog,private managerService: ManagerService, private route: ActivatedRoute, private router: Router) { }

  priorityOptions: string[] = ['Low', 'Medium', 'High', 'Critical'];
  statusOptions: string[] = ['Open', 'In Progress', 'Resolved','NotResolved','Verified','Closed'];
  assignedUserOptions: assignedUserOptions[] = [];
  users : User[] = []
  bugs: bug[] = [];
  managerId: number = 0; // Set a valid manager ID dynamically
  id: number = 0;
  projectName: string = "";

  ngOnInit() {
    // ✅ Get managerid from URL
    this.route.paramMap.subscribe(params => {
      this.id = Number(params.get('projectId')); // Convert to number
      this.managerId = Number(params.get('managerId'))
      if (this.id) {
        this.loadProjects();
        console.log("the assigned ",this.assignedUserOptions)
      }
    });
    
    this.managerService.getProjectByProjectId(this.id).subscribe(data=>{
      this.projectName = data.project_name;
      console.log(this.projectName)
    })
  }

  loadProjects(): void {
    this.managerService.getBugs(this.id).subscribe({
      next: (data) => {
        this.bugs = data;
        console.log("kdfladjfksdfhsldkfadl")
        console.log('Fetched Bugs:', this.bugs);
      },
      error: (err) => {
        console.error('Error fetching projects:', err);
      }
    });

    this.managerService.getAssignedUsersByProject(this.id).subscribe(usrs =>{
      console.log("The assigned members to project is :",usrs)
      this.assignedUserOptions = usrs;
    })
  }

  updateBug(bug: any) {
    console.log('Updating Bug:', bug);
    this.managerService.updateBug(bug.id,bug).subscribe({
      next: (response) => {
        console.log('Bug updated successfully:', response);
        alert('Bug updated successfully!');
      },
      error: (err) => {
        console.error('Error updating bug:', err);
        alert('Failed to update bug. Please try again.');
      }
    });
  }
  
  deleteBug(bugid: number) {
      const dialogRef = this.dialog.open(ConfirmDialogComponent);
    
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.managerService.deleteBug(bugid).subscribe(() => {
              // this.loadUsers();
              alert("Successfully Deleted Bug");
            },
            (error) => {
              alert("Failed in Deleting Bug");
              console.log(error);
            }
          );
        } else {
          console.log('Deletion cancelled');
        }
      });
    }
  

}
