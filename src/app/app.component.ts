import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { NavbarManagerComponent } from './components/navbar-manager/navbar-manager.component';
import { Router, RouterModule } from '@angular/router';
import { NavbarDeveloperComponent } from './components/navbar-developer/navbar-developer.component';
import { NavbarTesterComponent } from './components/navbar-tester/navbar-tester.component';
import { AuthService } from './auth.service';
import { CommonModule } from '@angular/common';
import { style } from '@angular/animations';

@Component({
  selector: 'app-root',
  imports: [CommonModule,RouterOutlet,FooterComponent,FormsModule,NavbarManagerComponent,NavbarDeveloperComponent,NavbarTesterComponent,NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'bugmanagmtfrontend';
  isUserLoggedIn = false;
  userRole:String|null = "";

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.isUserLoggedIn = this.authService.isAuthenticated();
    this.userRole = this.authService.getRole();
    console.log(this.userRole);
    

  }
}
