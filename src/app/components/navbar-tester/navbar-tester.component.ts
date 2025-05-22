import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-navbar-tester',
  imports: [CommonModule,RouterModule,MatToolbarModule,MatMenuModule],
  standalone:true,
  templateUrl: './navbar-tester.component.html',
  styleUrl: './navbar-tester.component.css'
})
export class NavbarTesterComponent {
  userid:String|null = "";


constructor(private authService :  AuthService){}
  logout() {
    this.authService.logout();
  }

  
    ngOnInit(){
      this.userid = this.authService.getUserId();
    }
  
}
