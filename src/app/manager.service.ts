import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tick } from '@angular/core/testing';
import { forkJoin, map, Observable, of, switchMap } from 'rxjs';
import { Project, User } from './admin.service';
import { builtinModules } from 'module';

export interface project_bug {
  id: number;
  project_name: string;
  status: string;
  assigned_project_manager_id: {
    userid: number
  };
  bugcount: number;
}

export interface bug {
  id: number;
  title: string;
  description: string;
  priority: string;
  status: string;
  created: Date;
  updated: Date;
  reported_by_user_id: {
    userid: number;
  };
  user: {
    userid: number;
  };
  project_id: {
    id: number;
  }
}

export interface assignedUserOptions {
  id: number;
  username: string;
}

export interface assignedProjectOptions {
  id: number;
  projectname: string;
}

export interface project_team {
  teamid : number;
  projectid : number;
  projectname: string,
  userid: number;
  username: string;
  userrole:string;
  bugs_assigned: number;
}

export interface project_team_firstpage{
  id: number;
  project_name: string;
  status: string;
  assigned_project_manager_id: {
    userid: number
  };
  membercount: number;
}


@Injectable({
  providedIn: 'root'
})

export class ManagerService {

  constructor(private httpClient: HttpClient) { }

  private apiurl = 'http://localhost:9090/api/bugs/';
  private apiurlproject = 'http://localhost:9090/api/projects/';
  private apiurlprojectteam = 'http://localhost:9090/api/teams/';
  private apiurlusers = 'http://localhost:9090/api/users/'

  getProjectByProjectId(projectid: number):Observable<any> {
    return this.httpClient.get<[any]>(`${this.apiurlproject}${projectid}`);
  }

  deleteTeamMember(memberid:Number):Observable<void>{
    return this.httpClient.delete<void>(`${this.apiurlprojectteam}${memberid}`)
  }

  getProjects(): Observable<[Project]> {
      return this.httpClient.get<[Project]>(this.apiurlproject);
    }

  getProjectByManager(managerId: number): Observable<any> {
    console.log(managerId)
    return this.httpClient.get<[any]>(`${this.apiurlproject}${managerId}/project/`)
  }

  getBugCount(projectId: number): Observable<number> {
    return this.httpClient.get<number>(`${this.apiurl}${projectId}/bugcount/`);
  }

  getBugs(projectid: number): Observable<[bug]> {
    return this.httpClient.get<[bug]>(`${this.apiurl}project/${projectid}/bugs/`);
  }

  getProjectsWithBugCounts(managerId: number): Observable<project_bug[]> {
    return this.getProjectByManager(managerId).pipe(
      switchMap(projects => {
        const requests = projects.map((project: project_bug) =>
          this.getActiveBugCount(project.id).pipe(
            map(bugcount => ({ ...project, bugcount }))
          )
        );
        return forkJoin(requests) as Observable<project_bug[]>; // Combines all API calls and returns the final array
      })
    );
  }

  //getprojectwith member count
  getProjectsWithMemberCount(managerId: number): Observable<project_team_firstpage[]> {
    return this.getProjectByManager(managerId).pipe(
      switchMap(projects => {
        const requests = projects.map((project: project_team_firstpage) =>
          this.getTeamMemberCount(project.id).pipe(
            map(membercount => ({ ...project, membercount }))
          )
        );
        return forkJoin(requests) as Observable<project_team_firstpage[]>; // Combines all API calls and returns the final array
      })
    );
  }

  addBug(bug: any): Observable<bug> {
    return this.httpClient.post<bug>(`${this.apiurl}`, bug);
  }

  getTeamMemberByProjectId(projectid: number): Observable<any> {
    console.log("The id to get project is ",projectid)
    return this.httpClient.get<[any]>(`${this.apiurlprojectteam}members/project/${projectid}`)
  }

  getUserById(userId: number): Observable<[User]> {
    return this.httpClient.get<[User]>(`${this.apiurlusers}` + `${userId}`);
  }

  getUserByIdOptions(userId: number): Observable<[assignedUserOptions]> {
    return this.httpClient.get<[assignedUserOptions]>(`${this.apiurlusers}` + `${userId}`).pipe(
      map((people:any)=>([
        {
          id : people.id , username : people.username
        }]
      ))
    );
  }

  getProjectByIdOptions(projectid:number):Observable<[assignedProjectOptions]>{
    return this.httpClient.get<[assignedProjectOptions]>(`${this.apiurlproject}${projectid}`).pipe(
      map((people:any)=>([
        {
          id : people.id , projectname : people.project_name
        }]
      ))
    );
  }

  getAllDeveloperAndTester(): Observable<assignedUserOptions[]> {
    const devs$ = this.httpClient.get<assignedUserOptions[]>(`${this.apiurlusers}role/DEVELOPER`);
    const testers$ = this.httpClient.get<assignedUserOptions[]>(`${this.apiurlusers}role/TESTER`);
  
    return forkJoin([devs$, testers$]).pipe(
      map(([devs, testers]) => [...devs, ...testers]) // Merge both arrays into one
    );
  }
  
  // getBugsByManagerId(id: number): Observable<bug[]> {
  //   return this.getProjectByManager(id).pipe(
  //     switchMap((projects: any[]) => {
  //       console.log("The Project Associated with Manager", projects);
        
  //       if (!projects || projects.length === 0) {
  //         console.warn("No Projects");
  //         return of([]); // Return an observable of an empty array
  //       }
  //       return of([])
  //       // If projects exist, fetch bugs for these projects
  //     })
  //   );
  // }
  
  getBugsByManagerId(id: number): Observable<bug[]> {
  return this.getProjectByManager(id).pipe(
    switchMap((projects: any[]) => {
      // console.log("Projects associated with Manager:", projects);

      if (!projects?.length) {
        console.warn("No projects found!");
        return of([]); // Return an empty observable array
      }

      const bugRequests = projects.map(project =>
        this.getBugs(project.id)
      );

      return forkJoin(bugRequests).pipe(
        map(bugLists => {
          const allBugs = bugLists.flat(); // Flatten the array of arrays
          console.log("Bugs fetched for manager's projects:", allBugs);
          return allBugs;
        })
      );
    })
  );
}

getBugsByManagerIdSorted(id: number, sortOrder: 'asc' | 'desc'): Observable<bug[]> {
  return this.getProjectByManager(id).pipe(
    switchMap((projects: any[]) => {
      console.log("Projects associated with Manager:", projects);

      if (!projects?.length) {
        console.warn("No projects found!");
        return of([]); // Return an empty observable array
      }

      const bugRequests = projects.map(project =>
        this.getBugs(project.id)
      );

      return forkJoin(bugRequests).pipe(
        map(bugLists => {
          let allBugs = bugLists.flat(); // Flatten the array of arrays

          // Sort bugs based on `createdAt`
          allBugs.sort((a, b) => 
            sortOrder === 'desc' 
              ? new Date(b.created).getTime() - new Date(a.created).getTime() // Newest first
              : new Date(a.created).getTime() - new Date(b.created).getTime() // Oldest first
          );

          console.log("Bugs fetched for manager's projects:", allBugs);
          return allBugs;
        })
      );
    })
  );
}






  getUserProfileById(userId: number): Observable<User> {
    return this.httpClient.get<User>(`${this.apiurlusers}` + `${userId}`);
  }

  getAssignedUsersByProject(projectId: number): Observable<assignedUserOptions[]> {
    return this.getTeamMemberByProjectId(projectId).pipe(
      switchMap((teamMembers: any[]) => {
        console.log("Team Members:", teamMembers); // Debugging
        if (!teamMembers || teamMembers.length === 0) {
          console.warn("No team members found!");
          return []; // Return an empty array
        }
        const userRequests = teamMembers.map(member =>
          this.getUserById(member.user.userid).pipe(
            map((people: any) => (   
              { 
              id: people.id, username: people.username 
            }))
          )
        );
        return forkJoin(userRequests); // Waits for all user requests to complete
      })
    );
  }

  getBugCountByUserIdAndProjectId(userId: number,projectId:number): Observable<number> {
    return this.httpClient.get<number>(`${this.apiurl}user/${userId}/project/${projectId}/bugcount/`);
  }

  //Team Count
  getTeamMemberCount(projectid:number):Observable<number>{
    return this.httpClient.get<number>(`${this.apiurlprojectteam}project/${projectid}/membercount/`)
  }

  //Getting Team Members 
  getTeamMembersByProject(projectId: number): Observable<project_team[]> {
    return this.getTeamMemberByProjectId(projectId).pipe(
      switchMap((teamMembers: any[]) => {
        console.log("Team Members:", teamMembers); // Debugging
  
        if (!teamMembers || teamMembers.length === 0) {
          console.log("No team members found!");
          return of([]); // Return an observable of an empty array
        }
        const userRequests = teamMembers.map(member =>
          this.getUserById(member.user.userid).pipe(
            switchMap((people: any) => 
              this.getBugCountByUserIdAndProjectId(people.id,member.project.id).pipe( // Get bug count for user
                map((bugCount: number) => ({
                  teamid : member.id,
                  projectid: member.project.id,
                  projectname: member.project.project_name,
                  userid: people.id,
                  username: people.username,
                  userrole: people.role,
                  bugs_assigned: bugCount
                }))
              )
            )
          )
        );
  
        return forkJoin(userRequests); // Wait for all requests to complete
      })
    );
  }

  getActiveBugCount(projectid:number):Observable<number>{
    return this.httpClient.get<number>(`${this.apiurl}project/${projectid}/activebugcount`)
  }
  
  getProjectCount(managerid:number):Observable<number>{
    return this.httpClient.get<number>(`${this.apiurlproject}manager/${managerid}/projectcount`)
  }

  updateBug(bugid:number,bug:bug):Observable<[bug]>{
    return this.httpClient.put<[bug]>(`${this.apiurl}${bugid}`,bug);
  }

  addMembr(member:any){
    return this.httpClient.post<[any]>(`${this.apiurlprojectteam}`,member);
  }

  deleteBug(bugid: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiurl}` + `${bugid}`);
  }

  private projectName: string = "";

  setProjectName(name: string) {
    this.projectName = name;
  }

  getProjectName(): string {
    return this.projectName;
  }

}
