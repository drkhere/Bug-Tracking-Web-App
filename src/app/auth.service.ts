import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:9090/api/auth'; // Change this based on your backend API

  constructor(private http: HttpClient) { }

  /** Logs in the user and starts a session */
  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials, { withCredentials: true, responseType: 'text' });
  }

  /** Checks if the user is logged in (session-based) */
  isAuthenticated(): boolean {
    return !!sessionStorage.getItem('userid'); // Change this if you're storing sessions differently
  }

  /** Fetches the logged-in user’s details */
  getSessionUser() {
    return this.http.get('http://localhost:9090/api/auth/session-user', { withCredentials: true })
    // Adjust URL
  }


  /** Logs out the user and clears the session */
  logout(): void {
    this.http.post(`${this.baseUrl}/logout`, {}, { withCredentials: true }).subscribe(() => {
      sessionStorage.clear();
      
      window.location.href = '/login'; // Redirect to login page
    });
  }


  /** Gets the role of the logged-in user */
  getRole(): string | null {
    return sessionStorage.getItem('role');
  }

  getUserId(): string | null {
    return sessionStorage.getItem('userid');
  }
}
