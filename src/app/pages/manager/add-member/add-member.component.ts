import { Component } from '@angular/core';
import { assignedProjectOptions, assignedUserOptions, ManagerService } from '../../../manager.service';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-member',
  imports: [MatSelectModule,MatFormFieldModule, MatIconModule, MatInputModule, FormsModule, MatTableModule, MatButtonModule,MatDatepickerModule,MatNativeDateModule,MatSelectModule,MatSelect,CommonModule],
  templateUrl: './add-member.component.html',
  styleUrl: './add-member.component.css'
})
export class AddMemberComponent {
 member = {
    project: {
      id:''
    },
    user : {
      userid:''
    },
    role: ''
  }

  projectid:number=0;
  projectName:assignedProjectOptions[] = [];
  userList : assignedUserOptions[]= [];

  constructor(private managerService: ManagerService,private route : ActivatedRoute) { }


  ngOnInit(){
    this.route.paramMap.subscribe(params =>{
      this.projectid = Number(params.get('projectid'));
    })
    this.managerService.getProjectByIdOptions(this.projectid).subscribe(res=>{
      this.projectName = res;
      console.log(this.projectName)

    })
    this.managerService.getAllDeveloperAndTester().subscribe(res=>{
      this.userList = res;
      console.log("All Devs and Testers ",this.userList)
    })
  }

  submitBug() {
    console.log(this.member)
    this.managerService.addMembr(this.member).subscribe(
      (response) => {
        console.log(response)
        alert('Member added successfully!');
        this.resetForm();
      },
      (error) => {
        alert('Failed to add Member.');
        console.error(error);
      }
    );
  }

  resetForm() {
    this.member = {
      project: {
        id:''
      },
      user : {
        userid:''
      },
      role: ''
    }
  }
}
