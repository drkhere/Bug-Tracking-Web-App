import { Component } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../auth.service';



@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbarModule,MatMenuModule,RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  userid:String|null = "";

  ngOnInit(){
    this.userid = this.authService.getUserId();
  }

  constructor(private authService :  AuthService,private route : ActivatedRoute){}
    logout() {
      this.authService.logout();
      
    }
}
