import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { forkJoin } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';


export interface projectassigend{

  userid: string
  projectid : number;
  projectname : string;
  managerid : number;
  bugcount:number
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


export interface bugupdation {
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
  project: {
    id: number;
  }
}

@Injectable({
  providedIn: 'root'
})
export class DeveloperService {

  constructor(private httpClient: HttpClient) { }

  private apiurl = 'http://localhost:9090/api/bugs/';
  private apiurlprojectteam = 'http://localhost:9090/api/teams/';
  private apiurlproject = 'http://localhost:9090/api/projects/';


  getAssigendProjectsByUserid(userid: number): Observable<[any]> {
    return this.httpClient.get<[any]>(`${this.apiurlprojectteam}user/${userid}/projects`);
  }

  getProjectByProjectId(projectid: number) {
    return this.httpClient.get<[any]>(`${this.apiurlproject}${projectid}`);
  }

  getBugCountByUserIdAndProjectId(userId: number,projectId:number): Observable<number> {
    return this.httpClient.get<number>(`${this.apiurl}user/${userId}/project/${projectId}/bugcount/`);
  }


  //Active Count of Bugs
  getActiveBugCountByUserIdAndProjectId(userId: number,projectId:number): Observable<number> {
    return this.httpClient.get<number>(`${this.apiurl}user/${userId}/project/${projectId}/activebugcount/`);
  }

  getBugByUserIdAndProjectId(userid:number,projectid:number):Observable<[bug]>{
    return this.httpClient.get<[bug]>(`${this.apiurl}user/${userid}/project/${projectid}/bugs`)
  }


  getAssignedProjectDetailsByUserId(userId: number): Observable<(projectassigend & { bugcount: number })[]> {
    return this.getAssigendProjectsByUserid(userId).pipe(
      switchMap((assignedProjects) => {
        console.log(assignedProjects);
  
        if (!assignedProjects) {
          return []; // Return an observable of an empty array if no assigned projects
        }
  
        const projectRequests = assignedProjects.map((proj) => {
          const projectId = proj.project.id;
          
  
          return forkJoin({
            project: this.getProjectByProjectId(projectId),
            bugcount: this.getActiveBugCountByUserIdAndProjectId(userId, projectId)
          }).pipe(
            map(({ project, bugcount }) => ({
              userid : proj.user.userid,
              projectid: proj.project.id,
              projectname: proj.project.project_name,
              managerid: proj.project.user.userid,
              bugcount: bugcount // Adding bug count to response
            }))
          );
        });
  
        return forkJoin(projectRequests);
      })
    );
  }

  getBugsByUserid(userid:number):Observable<[bug]>{
    return this.httpClient.get<[bug]>(`${this.apiurl}user/${userid}/bugs`)
  }

  getBugsByUserIdSorted(id: number, sortOrder: 'asc' | 'desc'): Observable<bug[]> {
    return this.getBugsByUserid(id).pipe(
      map((bugs: bug[]) => {
        if (!bugs?.length) {
          console.warn("No bugs found for the user!");
          return [];
        }
  
        // Sort bugs based on `created`
        return bugs.sort((a, b) =>
          sortOrder === 'desc'
            ? new Date(b.created).getTime() - new Date(a.created).getTime() // Newest first
            : new Date(a.created).getTime() - new Date(b.created).getTime() // Oldest first
        );
      })
    );
  }

  getActiveBugCount(userid:number):Observable<number>{
    return this.httpClient.get<number>(`${this.apiurl}user/${userid}/activebugcount`)
  }

  getBugCountByUserid(userid:number){
    return this.httpClient.get<number>(`${this.apiurl}user/${userid}/bug/bugcount`)
  }

  getProjectCountByUserId(userid:number):Observable<number>{
    return this.httpClient.get<number>(`${this.apiurlprojectteam}user/${userid}/project/projectcount`)
  }

    getBugs(userid:number,projectid: number): Observable<[bug]> {
      return this.httpClient.get<[bug]>(`${this.apiurl}user/${userid}/project/${projectid}/bugs/`);
    }
  

  updateBug(bugid:number,bug:bug):Observable<[bug]>{
      return this.httpClient.put<[bug]>(`${this.apiurl}${bugid}`,bug);
    }

}
