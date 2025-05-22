import { Component } from '@angular/core';
import { AdminService, UpdateUserModel, User } from '../../../admin.service';
import { ActivatedRoute } from '@angular/router';


import {ChangeDetectionStrategy} from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';

@Component({
  selector: 'app-updation-page',
  standalone:true,
  imports: [MatSelectModule,MatFormFieldModule,MatIconModule,MatInputModule,FormsModule,MatTableModule,MatButtonModule],
  templateUrl: './updation-page.component.html',
  styleUrl: './updation-page.component.css'
})
export class UpdationPageComponent {
// user: User | null = null;
user: User = {} as User;

  userid:number = 0;

  constructor(private adminService : AdminService,private route : ActivatedRoute){}

  ngOnInit(){
    this.route.paramMap.subscribe(params => {
      this.userid = Number(params.get('userid')); // Convert to number
      if (this.userid) {
        this.adminService.getUserById(this.userid).subscribe(response =>{
          console.log("User data as response",response)
          this.user = response
          console.log("The Data",this.user)
          console.log("the username ",this.user.first_name)
        })
      }
    });
    
  }

  updateUser() {
    if (
      !this.user.username ||
      !this.user.password ||
      !this.user.first_name ||
      !this.user.last_name ||
      !this.user.email ||
      !this.user.role ||
      !this.user.status
    ) {
      alert('Please fill all required fields.');
      return;
    }
  
    console.log(this.user);
    this.adminService.updateUser(this.user,this.userid).subscribe(
      (response) => {
        console.log(response);
        alert('User Updated successfully!');
        // this.resetForm();
      },
      (error) => {
        alert('Failed to update user.');
        console.error(error);
      }
    );
  }
}
