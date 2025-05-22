import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import this
import { FormsModule } from '@angular/forms';
import { MatTable, MatTableModule } from '@angular/material/table';
import { setAlternateWeakRefImpl } from '@angular/core/primitives/signals';
import { AdminService, User } from '../../../admin.service';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { ConfirmDialogComponent } from '../../../components/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';




@Component({
  selector: 'app-userslist',
  imports: [CommonModule, FormsModule, MatTableModule, MatTable, MatIconModule,RouterModule],
  templateUrl: './userslist.component.html',
  styleUrl: './userslist.component.css'
})
export class UserslistComponent {

  displayedColumns: string[] = ['id', 'username', 'firstname', 'lastname', 'email', 'role', 'status', 'created', 'updated', 'action']; // Must match `matColumnDef`

  users: User[] = [];

  constructor(private dialog: MatDialog,private adminService: AdminService) { }

  ngOnInit() {
    this.loadUsers();
  }

  // Fetch users from backend
  loadUsers() {
    this.adminService.getUsers().subscribe((data) => {
      this.users = data;
      console.log(this.users)
    });
  }
  add() {
    alert("Hey you are added");
  }

  updateUser(user: any) {
    alert(`Updating user: ${user.name}`);
  }

  
deleteUser(userid: number) {
  const dialogRef = this.dialog.open(ConfirmDialogComponent);

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.adminService.deleteUser(userid).subscribe(() => {
          this.loadUsers();
          alert("Successfully Deleted User");
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
