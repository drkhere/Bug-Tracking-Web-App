import { Component } from '@angular/core';
import { AdminService, User } from '../../admin.service';
import { ManagerService } from '../../manager.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-profile-page',
  standalone:true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css'
})
export class ProfilePageComponent {

  user: User | null = null;
  userid:String|number = "";

  constructor(private managerService : ManagerService,private route : ActivatedRoute){}

  ngOnInit(){
    this.route.paramMap.subscribe(params => {
      this.userid = Number(params.get('userid')); // Convert to number
      if (this.userid) {
        this.managerService.getUserProfileById(this.userid).subscribe(response =>{
          console.log("profile data as response",response)
          this.user = response
          console.log("The Data",this.user)
          console.log("the username ",this.user.first_name)
        })
      }
    });
    
  }

}
