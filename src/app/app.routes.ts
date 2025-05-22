import { Routes } from '@angular/router';
import { HomeComponent } from './pages/admin/home/home.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { AdduserComponent } from './pages/admin/adduser/adduser.component';
import { UserslistComponent } from './pages/admin/userslist/userslist.component';
import { ProjectslistComponent } from './pages/admin/projectslist/projectslist.component';
import { AddprojectComponent } from './pages/admin/addproject/addproject.component';
import { BugProjectListComponent } from './pages/manager/bug-project-list/bug-project-list.component';
import { combineLatest } from 'rxjs';
import { Component } from '@angular/core';
import { BugListComponent } from './pages/manager/bug-list/bug-list.component';
import { AddBugComponent } from './pages/manager/add-bug/add-bug.component';
import { TeamMembersComponent } from './pages/manager/team-members/team-members.component';
import { ProjectTeamMembrListComponent } from './pages/manager/project-team-membr-list/project-team-membr-list.component';
import { AddMemberComponent } from './pages/manager/add-member/add-member.component';
import { AssigendBugsComponent } from './pages/developer/assigend-bugs/assigend-bugs.component';
import { AssignedBugMainlistComponent } from './pages/developer/assigned-bug-mainlist/assigned-bug-mainlist.component';
import { BugListProjectComponent } from './pages/tester/bug-list-project/bug-list-project.component';
import { BugListMainComponent } from './pages/tester/bug-list-main/bug-list-main.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './auth.guard';
import { ManagerdashboardComponent } from './pages/manager/managerdashboard/managerdashboard.component';
// import { DeveloperDashboardComponent } from './pages/developer/developer-dashboard/developer-dashboard.component';
// import { TesterDashboardComponent } from './pages/tester/tester-dashboard/tester-dashboard.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { UpdationPageComponent } from './pages/admin/updation-page/updation-page.component';
import { ProjectUpdationPageComponent } from './pages/admin/project-updation-page/project-updation-page.component';
import { MainreportPageComponent } from './pages/admin/mainreport-page/mainreport-page.component';
import { MainreportmanagerPageComponent } from './pages/manager/mainreportmanager-page/mainreportmanager-page.component';
import { DeveloperdashboardComponent } from './pages/developer/developerdashboard/developerdashboard.component';
import { TesterdashboardComponent } from './pages/tester/testerdashboard/testerdashboard.component';
import { MainreportpagedeveloperComponent } from './pages/developer/mainreportpagedeveloper/mainreportpagedeveloper.component';
import { MainreportpagetesterComponent } from './pages/tester/mainreportpagetester/mainreportpagetester.component';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { BugupdationpageComponent } from './pages/manager/bugupdationpage/bugupdationpage.component';
import { BugupdationpageDeveloperComponent } from './pages/developer/bugupdationpage-developer/bugupdationpage-developer.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    {path : 'profile/user/:userid',component:ProfilePageComponent},
    
    // Admin Routes
    { path: 'admin/dashboard', component: HomeComponent, canActivate: [authGuard],data :{roles:['ADMIN']} },
    { path: 'adduser', component: AdduserComponent, canActivate: [authGuard], data: { roles: ['ADMIN'] } },
    { path: 'userlist', component: UserslistComponent, canActivate: [authGuard], data: { roles: ['ADMIN'] } },
    { path: 'projectlist', component: ProjectslistComponent, canActivate: [authGuard], data: { roles: ['ADMIN'] } },
    { path: 'addproject', component: AddprojectComponent, canActivate: [authGuard], data: { roles: ['ADMIN'] } },
    { path: 'user/:userid', component: UpdationPageComponent, canActivate: [authGuard], data: { roles: ['ADMIN'] } },
    { path: 'project/:projectid', component: ProjectUpdationPageComponent, canActivate: [authGuard], data: { roles: ['ADMIN'] } },
    { path: 'reports', component: MainreportPageComponent, canActivate: [authGuard], data: { roles: ['ADMIN'] } },





    // Manager Routes
    { path: 'manager/home', component: ManagerdashboardComponent, canActivate: [authGuard], data: { roles: ['MANAGER'] } },
    { path: 'bugs/user/:managerid', component: BugProjectListComponent, canActivate: [authGuard], data: { roles: ['MANAGER'] } },
    { path: 'bugs/user/:managerId/project/:projectId', component: BugListComponent, canActivate: [authGuard], data: { roles: ['MANAGER'] } },
    { path: 'bugs/user/:userid/project/:projectid/addbug', component: AddBugComponent, canActivate: [authGuard], data: { roles: ['MANAGER'] } },
    { path: 'teams/user/:managerid', component: TeamMembersComponent, canActivate: [authGuard], data: { roles: ['MANAGER'] } },
    { path: 'teams/user/:managerid/project/:projectId', component: ProjectTeamMembrListComponent, canActivate: [authGuard], data: { roles: ['MANAGER'] } },
    { path: 'project/:projectid/addmember', component: AddMemberComponent, canActivate: [authGuard], data: { roles: ['MANAGER'] } },
    { path: 'manager/reports', component: MainreportmanagerPageComponent, canActivate: [authGuard], data: { roles: ['MANAGER'] } },

    // Developer Routes
    { path: 'developer/home', component: DeveloperdashboardComponent, canActivate: [authGuard], data: { roles: ['DEVELOPER'] } },
    { path: 'bugs/developer/user/:userid', component: AssigendBugsComponent, canActivate: [authGuard], data: { roles: ['DEVELOPER'] } },
    { path: 'bugs/developer/user/:userid/project/:projectid', component: AssignedBugMainlistComponent, canActivate: [authGuard], data: { roles: ['DEVELOPER'] } },
    { path: 'developer/reports', component: MainreportpagedeveloperComponent, canActivate: [authGuard], data: { roles: ['DEVELOPER'] } },
    { path: 'bugs/developer/user/:userid/project/:projectid/bug/:bugid', component: BugupdationpageDeveloperComponent, canActivate: [authGuard], data: { roles: ['DEVELOPER'] } },//the developer component is userd in tester as well for bug updation purpose because both pages are same..


    // Tester Routes
    { path: 'tester/home', component: TesterdashboardComponent, canActivate: [authGuard], data: { roles: ['TESTER'] } },
    { path: 'bugs/tester/user/:userid', component: BugListProjectComponent, canActivate: [authGuard], data: { roles: ['TESTER'] } },
    { path: 'bugs/tester/user/:userid/project/:projectid', component: BugListMainComponent, canActivate: [authGuard], data: { roles: ['TESTER'] } },
    { path: 'tester/reports', component: MainreportpagetesterComponent, canActivate: [authGuard], data: { roles: ['TESTER'] } },
    { path: 'bugs/tester/user/:userid/project/:projectid/bug/:bugid', component: BugupdationpageDeveloperComponent, canActivate: [authGuard], data: { roles: ['TESTER'] } },//the developer component is userd in tester as well for bug updation purpose because both pages are same..


    // Default & Fallback
    { path: 'chatbot', component: ChatbotComponent},

    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: '**', component: PagenotfoundComponent },
];
