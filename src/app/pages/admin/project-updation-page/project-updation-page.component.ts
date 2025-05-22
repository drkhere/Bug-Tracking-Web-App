import { Component } from '@angular/core';
import { AdminService, Project } from '../../../admin.service';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { assignedUserOptions } from '../../../manager.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project-updation-page',
  imports: [MatDatepickerModule,MatSelectModule,MatNativeDateModule,MatFormFieldModule, MatIconModule, MatInputModule, FormsModule, MatTableModule, MatButtonModule,CommonModule],
  templateUrl: './project-updation-page.component.html',
  styleUrl: './project-updation-page.component.css'
})
export class ProjectUpdationPageComponent {

  project: Project = {} as Project;
  projectid:number = 0;
  assignedProjectManagers: assignedUserOptions[] = [];
  
  
constructor(private adminService : AdminService,private route : ActivatedRoute){}

  ngOnInit(){
    this.route.paramMap.subscribe(params => {
      this.projectid = Number(params.get('projectid')); // Convert to number
      if (this.projectid) {
        this.adminService.getProjectById(this.projectid).subscribe(response =>{
          console.log("User data as response",response)
          this.project = response
          console.log("The Data",this.project)
          console.log("the username ",this.project.project_name)
        })
      }
    });
    
    this.getAllProjectManagers();

  }

  updateProject() {
    if (
      !this.project.project_name ||
      !this.project.description ||
      !this.project.start_date ||
      !this.project.end_date ||
      !this.project.status ||
      !this.project.created ||
      !this.project.updated ||
      !this.project.user 
    ) {
      alert('Please fill all required fields.');
      return;
    }
  
    console.log(this.project);
    this.adminService.updateProject(this.project,this.projectid).subscribe(
      (response) => {
        console.log(response);
        alert('Project Updated successfully!');
        // this.resetForm();
      },
      (error) => {
        alert('Failed to update Project.');
        console.error(error);
      }
    );
  }

  getAllProjectManagers() {
    // Replace this with your actual service call
    this.adminService.getUserByRole("MANAGER").subscribe((res: any) => {
      this.assignedProjectManagers = res;
    });
  }
}
