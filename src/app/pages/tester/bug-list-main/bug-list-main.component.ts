import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatTable, MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { bug, DeveloperService } from '../../../developer.service';

@Component({
  selector: 'app-bug-list-main',
  imports: [MatButtonModule, MatSelectModule, MatFormFieldModule, MatIconModule, MatTable, MatTableModule, RouterModule, CommonModule, FormsModule],
  templateUrl: './bug-list-main.component.html',
  styleUrl: './bug-list-main.component.css'
})
export class BugListMainComponent {
  displayedColumns: string[] = ['id', 'projectid', 'title', 'description', 'priority', 'status', 'created', 'updated', 'reportedBy', 'assignedTo'];
  constructor(private managerService: DeveloperService, private route: ActivatedRoute, private router: Router) { }

  priorityOptions: string[] = ['Low', 'Medium', 'High', 'Critical'];
  statusOptions: string[] = ['Resolved','NotResolved', 'Verified', 'Open'];
  bugs: bug[] = [];
  managerId: number = 0; // Set a valid manager ID dynamically
  id: number = 0;
  userid: number = 0;
  projectName: string = "";

  ngOnInit() {
    // ✅ Get managerid from URL
    this.route.paramMap.subscribe(params => {
      this.id = Number(params.get('projectid')); // Convert to number
      this.userid = Number(params.get('userid'));
      if (this.id) {
        this.loadBugs();
      }
    });
  }

  loadBugs(): void {
    this.managerService.getBugs(this.userid, this.id).subscribe({
      next: (data) => {
        this.bugs = data.filter(bug => bug.status.toLowerCase() !== 'closed');
        console.log("kdfladjfksdfhsldkfadl")
        console.log('Fetched Bugs:', this.bugs);
      },
      error: (err) => {
        console.error('Error fetching projects:', err);
      }
    });
  }

  updateBug(bug: any) {
    console.log('Updating Bug:', bug);
    this.managerService.updateBug(bug.id, bug).subscribe({
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

  BugPage(bugid: number, projectid: number) {
    console.log("Navigating with userid, projectid , bugid:", this.userid, projectid, bugid);
    this.router.navigate([`/bugs/tester/user/`+ this.userid+ `/project/`+ projectid+ `/bug/`, bugid]);
}
}
