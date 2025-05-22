import { Component } from '@angular/core';
import { AdminService } from '../../../admin.service';

import { ChangeDetectionStrategy } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { assignedUserOptions } from '../../../manager.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-addproject',
  imports: [MatDatepickerModule,MatSelectModule,MatNativeDateModule,MatFormFieldModule, MatIconModule, MatInputModule, FormsModule, MatTableModule, MatButtonModule,CommonModule,MatOptionModule,ReactiveFormsModule],
  templateUrl: './addproject.component.html',
  styleUrl: './addproject.component.css'
})
export class AddprojectComponent {

  // project = {
  //   project_name: '',
  //   description: '',
  //   user: {
  //     userid: ''
  //   },
  //   start_date: '',
  //   end_date: '',
  //   status: '',
  // }

  assignedProjectManagers: assignedUserOptions[] = [];

  projectForm : FormGroup;


  constructor(private adminService: AdminService,private fb:FormBuilder) { 
    this.projectForm = this.fb.group({
          project_name: ['', [Validators.required, Validators.minLength(3)]],
          description: ['', [Validators.required, Validators.minLength(6)]],
          user : this.fb.group({
            userid: ['', Validators.required],
          }),
          start_date: ['', Validators.required],
          end_date: ['', [Validators.required]],
          status: ['', Validators.required],
        });
  }

  ngOnInit() {
    this.getAllProjectManagers();
  }

  submitted = false;
  submitProject() {
    this.submitted = true;
    if (this.projectForm.invalid) {
      console.log(this.projectForm.value)
      alert('Please fill all required fields correctly.');
      return;
    }
    console.log(this.projectForm.value)
    this.adminService.addProject(this.projectForm.value).subscribe(
      (response) => {
        console.log(response)
        alert('Project added successfully!');
        // this.resetForm();
      },
      (error) => {
        alert('Failed to add Project.');
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

  // resetForm() {
  //   this.project = {
  //     project_name: '',
  //     description: '',
  //     user: {
  //       userid: ''
  //     },
  //     start_date: '',
  //     end_date: '',
  //     status: '',
  //   };
  // }

}
