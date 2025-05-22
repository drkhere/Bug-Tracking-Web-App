import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Timestamp } from 'rxjs';
import { bug } from './manager.service';
import { bugupdation } from './developer.service';

export interface User {
  id: number;
  username: string;
  password: string;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  status: string;
  created: Date;
  updated: Date;
}

export interface UpdateUserModel {
  id: number|null;
  username: string|null;
  password: string|null;
  first_name: string|null;
  last_name: string|null;
  email: string|null;
  role: string|null;
  status: string|null;
  created: Date|null;
  updated: Date|null;
}
export interface Project {
  id: number;
  project_name: string;
  description: string;
  start_date: Date;
  end_date: Date;
  status: string;
  user: {
    userid: number
  };
  created: Date;
  updated: Date;
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'http://localhost:9090/api/users/'; // Replace with your actual API endpoint
  private apiProjects = 'http://localhost:9090/api/projects/';
  private apiBugs = 'http://localhost:9090/api/bugs/';


  constructor(private http: HttpClient) { }

  // Fetch all users from backend
  getUsers(): Observable<[User]> {
    return this.http.get<[User]>(this.apiUrl);
  }


  getUserById(userid:number):Observable<User>{
    return this.http.get<User>(`${this.apiUrl}${userid}`);
  }
  deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}` + `${userId}`);
  }

  addUser(user: any): Observable<[any]> {
    return this.http.post<[any]>(`${this.apiUrl}`, user);
  }

  updateUser(user:any,userid:number):  Observable<[any]>{
    return this.http.put<[any]>(`${this.apiUrl}${userid}`,user);
  }

  addProject(project: any): Observable<[any]> {
    return this.http.post<[any]>(`${this.apiProjects}`, project)
  }

  getProjects(): Observable<[Project]> {
    return this.http.get<[Project]>(this.apiProjects);
  }

  getProjectById(projectid:number):Observable<Project>{
    return this.http.get<Project>(`${this.apiProjects}${projectid}`);
  }

  // getProjectByIdOptions(projectid:number):Observable<any>{
  //   return this.http.get<any>(`${this.apiProjects}${projectid}`);
  // }

  updateProject(project:any,projectid:number):  Observable<[any]>{
    return this.http.put<[any]>(`${this.apiProjects}${projectid}`,project);
  }

  deleteProject(projectId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiProjects}` + `${projectId}`);
  }

  // getBugsById(bugId: number) {
  //   return this.http.get<void>(`${this.apiBugs}project/${bugId}/bugs`)
  // }

  getBugsById(projectid: number) {
    return this.http.get<void>(`${this.apiBugs}project/${projectid}/bugs`)
  }

  getUserByRole(role:string){
    return this.http.get<any>(`${this.apiUrl}role/${role}`)
  }

  getUserCount():Observable<Number>{
    return this.http.get<Number>(`${this.apiUrl}count/alluser`)
  }

  getProjectCount():Observable<Number>{
    return this.http.get<Number>(`${this.apiProjects}count/allproject`)
  }

  getActiveProjectCount():Observable<Number>{
    return this.http.get<Number>(`${this.apiProjects}count/active/allproject`)
  }

  getBugByBugId(bugid:number){
    return this.http.get<bugupdation>(`${this.apiBugs}${bugid}`)
  }
}
