import { Component } from '@angular/core';
import { bug, bugupdation } from '../../../developer.service';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '../../../admin.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { ManagerService } from '../../../manager.service';
import { ChatbotComponent } from '../../../chatbot/chatbot.component';
import { ChatbotService } from '../../../chatbot.service';

@Component({
  selector: 'app-bugupdationpage-developer',
  imports: [MatSelectModule, MatFormFieldModule, MatIconModule, MatInputModule, FormsModule, MatTableModule, MatButtonModule, MatDatepickerModule, MatNativeDateModule, CommonModule,ReactiveFormsModule],
  templateUrl: './bugupdationpage-developer.component.html',
  styleUrl: './bugupdationpage-developer.component.css'
})
export class BugupdationpageDeveloperComponent {

  bugForm: FormGroup;
  bugbody: bugupdation[] = [];
  bugid: number = 0;
  aisuggestion:String='';
  projectId:number = 0;

  constructor(private route: ActivatedRoute, private adminService: AdminService, private fb: FormBuilder,private managerService : ManagerService,private chatBotService : ChatbotService) {
    this.bugForm = this.fb.group({
      title: [''],
      description: [''],
      priority: [''],
      status: [''],
      created: [''],
      updated: [''],
      reported_by_user_id: this.fb.group({
        userid: ['']
      }),
      user: this.fb.group({
        userid: ['']
      }),
      project: this.fb.group({
        id: ['']
      })
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.bugid = Number(params.get('bugid'));
      this.getBug(this.bugid);
      this.projectId = Number(params.get('projectid'))
      this.getSuggestion(this.bugid)
    });

  }

  // getBug(bugid: number) {
  //   this.adminService.getBugByBugId(bugid).subscribe(bug => {
  //     this.bugbody[0] = bug;
  //     console.log("The Bug at update Page ", this.bugbody[0]);

  //     // Populate the form with existing bug data
  //     this.bugForm.patchValue({
  //       title: bug.title,
  //       description: bug.description,
  //       priority: bug.priority,
  //       status: bug.status,
  //       created: bug.created,
  //       updated: bug.updated,
  //       reported_by_user_id: {
  //          userid: bug.reported_by_user_id?.userid || '' 
  //         },
  //       user: { userid: bug.user?.userid || '' },
  //       project: { id: bug.project_id?.id || '' }
  //     });
  //   });
  // }
  getBug(bugid: number) {
    this.adminService.getBugByBugId(bugid).subscribe(bug => {
      this.bugbody[0] = bug;
      console.log("The Bug at update Page ", this.bugbody[0]);
  
      // Properly patching values instead of reinitializing the FormGroup
      this.bugForm.patchValue({
        title: bug?.title || '',
        description: bug?.description || '',
        priority: bug?.priority || '',
        status: bug?.status || '',
        created: bug?.created || '',
        updated: bug?.updated || '',
        reported_by_user_id: { 
          userid: bug?.reported_by_user_id?.userid || '' },
        user: { 
          userid: bug?.user?.userid || '' },
        project: { 
          id: bug?.project?.id || '' }
      });
    });
  }
  

  updateBug() {
    if (this.bugForm.valid) {
      const updatedBug = this.bugForm.value;
      console.log("The updated bug",updatedBug)
      this.managerService.updateBug(this.bugid, updatedBug).subscribe(response => {
        console.log("Bug updated successfully", response);
        alert("Bug updated successfully!");
      }, error => {
        console.error("Error updating bug", error);
      });
    }
  }

  getSuggestion(bugid: number) {
    this.chatBotService.getSuggestionByBug_Id(bugid).subscribe(suggestion => {
      this.aisuggestion = suggestion?.suggestions || 'No suggestions yet.';
      console.log(suggestion)
    });
  }

}
