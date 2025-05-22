import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ChangeDetectionStrategy, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {

  // constructor(private authService : AuthService){}

  // hide = signal(true);
  // clickEvent(event: MouseEvent) {
  //   event.preventDefault();  // Prevent form submission
  //   this.hide.set(!this.hide());
  //   event.stopPropagation();
  // }


  // userid = 0;
  // password = "";

  // loginHere() {
    
  //   if (!this.userid || !this.password) {
  //     alert('Please enter both User ID and Password');
  //     return;
  //   }
  
  //   const credentials = { userid: this.userid, password: this.password };
  //   console.log(credentials.userid)
  //   console.log(credentials.password)
  
  //   this.authService.login(credentials).subscribe(
  //     (response) => {
  //       alert('Login successful');
  //       console.log(response);
  //       this.authService.getSessionUser().subscribe(
  //         (user: any) => {
  //           console.log("use obejct",user)
  //           sessionStorage.setItem('role', user.role);
  //           sessionStorage.setItem('userid', user.userid);
  //           // window.location.reload();
  //         }
  //       );
  //       window.location.reload();


  //     },
  //     (error) => {
  //       alert('Login failed. Please check your credentials.');
  //       console.error(error);
  //     }
  //   );
  // }

  constructor(private authService: AuthService, private router: Router) {}

  hide = signal(true);
  username = "";
  password = "";
  message = "";

  clickEvent(event: MouseEvent) {
    event.preventDefault();
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  loginHere() {
    if (!this.username || !this.password) {
      alert('Please enter both User ID and Password');
      return;
    }

    const credentials = { username: this.username, password: this.password };
    console.log(credentials.username);
    console.log(credentials.password);

    this.authService.login(credentials).subscribe(
      (response:any) => {
        alert(response)
        
        this.authService.getSessionUser().subscribe(
          (user: any) => {
            console.log("User object:", user);
            sessionStorage.setItem('role', user.role);
            sessionStorage.setItem('userid', user.userid);

            // Navigate based on role and reload after short delay
            let targetRoute = '/login'; // Default fallback
            switch (user.role) {
              case 'ADMIN':
                targetRoute = '/admin/dashboard';
                break;
              case 'MANAGER':
                targetRoute = '/manager/home';
                break;
              case 'DEVELOPER':
                targetRoute = '/developer/home';
                break;
              case 'TESTER':
                targetRoute = '/tester/home';
                break;
            }

            this.router.navigate([targetRoute]).then(() => {
              setTimeout(() => {
                window.location.reload(); // Reload to update navbar
              }, 100); // Small delay ensures navigation happens first
            });
          },
          (error) => {
            console.error('Error fetching user session:', error);
          }
        );
      },
      (error) => {
        alert('Login failed. Please check your credentials.');
        console.error(error);
      }
    );
  }
  
}
