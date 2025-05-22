import { Component } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import { Router,RouterModule } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  standalone: true,
  selector: 'app-navbar-manager',
  imports: [RouterModule,MatToolbarModule,MatMenuModule],
  templateUrl: './navbar-manager.component.html',
  styleUrl: './navbar-manager.component.css'
})
export class NavbarManagerComponent {
  userid:String|null = "";


  constructor(private authService :  AuthService){}

  ngOnInit(){
    this.userid = this.authService.getUserId();
  }

  logout() {
    this.authService.logout();
  }


  
}
