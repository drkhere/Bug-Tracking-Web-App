import { Component } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-navbar-developer',
  imports: [RouterModule,MatToolbarModule,MatMenuModule],
  standalone:true,
  templateUrl: './navbar-developer.component.html',
  styleUrl: './navbar-developer.component.css'
})
export class NavbarDeveloperComponent {
  userid:String|null = "";


  constructor(private authService :  AuthService){}

  ngOnInit(){
    this.userid = this.authService.getUserId();
  }

  logout() {
    this.authService.logout();
  }
}
