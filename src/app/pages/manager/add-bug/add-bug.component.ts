import { Component } from '@angular/core';
import { assignedProjectOptions, assignedUserOptions, ManagerService } from '../../../manager.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { AdminService } from '../../../admin.service';
import { forkJoin } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ChatbotComponent } from '../../../chatbot/chatbot.component';
import { ChatbotService, suggestiontable } from '../../../chatbot.service';



@Component({
  standalone:true,
  selector: 'app-add-bug',
  imports: [MatSelectModule, MatFormFieldModule, MatIconModule, MatInputModule, FormsModule, MatTableModule, MatButtonModule, MatDatepickerModule, MatNativeDateModule, CommonModule,ReactiveFormsModule],
  templateUrl: './add-bug.component.html',
  styleUrl: './add-bug.component.css'
})
export class AddBugComponent {

  usersList: assignedUserOptions[] = []
  projectid: number=0;
  reportedid: number=0;
  managerName: assignedUserOptions[]=[];
  projectName: assignedProjectOptions[]=[];
  bug = {
    title: '',
    description: '',
    priority: '',
    status: '',
    created: '',
    updated: '',
    reported_by_user_id: {
      userid: ''
    },
    user: {
      userid: ''
    },
    project: {
      id: ''
    },
  }
  suggestiontable:suggestiontable[]=[]


  bugForm :FormGroup



  constructor(private chatbotService : ChatbotService,private managerService: ManagerService, private adminService: AdminService,private route :ActivatedRoute,private fb : FormBuilder) {
    this.bugForm = this.fb.group({
              title: ['', [Validators.required, Validators.minLength(3)]],
              description: ['', [Validators.required]],
              priority: ['',[Validators.required]],
              status:['',[Validators.required]],
              created:['',[Validators.required]],
              updated:['',[Validators.required]],
              reported_by_user_id:this.fb.group({
                userid: ['',[Validators.required]]
              }),
              user : this.fb.group({
                userid: ['', Validators.required],
              }),
              project:this.fb.group({
                id:['',[Validators.required]]
              })
            });
   }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.projectid = Number(params.get('projectid')); // Convert to number
      this.reportedid = Number(params.get('userid'));
      this.bug.reported_by_user_id.userid = String(this.reportedid);
      this.bug.project.id = String(this.projectid)
      this.managerService.getUserByIdOptions(this.reportedid).subscribe(res=>{
        this.managerName = res;
        console.log(this.managerName)
      })
      this.managerService.getProjectByIdOptions(this.projectid).subscribe(res=>{
        this.projectName = res;
        console.log(this.projectName)

      })

      if (this.projectid) {
        this.getAllDevelopersAndTesters();
        console.log("hellowjldsfj dfjdf")
        console.log("the assigned ",this.usersList)
      }
    });
  }

  aisugggestion: string[] = []; // Change from string to array


  onGenerate() {
    let descriptionControl = this.bugForm.get('description');
  
    if (!descriptionControl || !descriptionControl.value.trim()) {
      alert("Please enter a description before generating a suggestion.");
      return;
    }
  
    let descriptionText: string = descriptionControl.value.trim();
    alert("Generating suggestion based on: " + descriptionText);
  
    this.chatbotService.sendDescription(descriptionText).subscribe(
      (data: string[]) => {
        this.aisugggestion = data; // Directly assign the array since backend always returns a list
      },
      (error) => {
        console.error("Error:", error);
        alert("Failed to generate a suggestion. Please try again.");
      }
    );
  }

  submitted= false;
  submitBug() {
    this.submitted=true;
    if(this.bugForm.invalid){
      alert("Fill all the fields required");
      return;
    }
    // console.log(this.bugForm.value)


    this.managerService.addBug(this.bugForm.value).subscribe(
      
      (response) => {
        console.log("The res ",response)
        console.log("The bug id is ",response.id)
        alert('Bug added successfully!');
        if (this.aisugggestion.length > 0) {
          let suggestionObj: suggestiontable = {
            bug: {
              id: response.id
            }, // Ensure this is the correct field from response
            suggestions: this.aisugggestion.join(", ")
          };
  
          // Call API to save suggestion
          this.chatbotService.addSuggestion(suggestionObj).subscribe(
            (res) => console.log("Suggestion saved:", res),
            (err) => console.error("Error saving suggestion:", err)
          );
        }
                this.resetForm();

      },
      (error) => {
        alert('Failed to add Project.');
        console.error(error);
      }
    );
  }

  // getAllDevelopersAndTesters() {
  //   forkJoin({
  //     testers: this.adminService.getUserByRole("TESTER"),
  //     developers: this.adminService.getUserByRole("DEVELOPER")
  //   }).subscribe(({ testers, developers }) => {
  //     // Merge both arrays
  //     this.usersList = [...testers, ...developers];
  //   });
  // }
  getAllDevelopersAndTesters() {

    this.managerService.getAssignedUsersByProject(this.projectid).subscribe(usrs => {
      console.log("The assigned members to project is :", usrs)
      this.usersList = usrs;
    })
  }


  resetForm() {
    this.bug = {
      title: '',
      description: '',
      priority: '',
      status: '',
      created: '',
      updated: '',
      reported_by_user_id: {
        userid: ''
      },
      user: {
        userid: ''
      },
      project: {
        id: ''
      },
    };
  }


  // onGenerate() {
  //   let descriptionControl = this.bugForm.get('description');
  
  //   if (!descriptionControl || !descriptionControl.value.trim()) {
  //     alert("Please enter a description before generating a suggestion.");
  //     return;
  //   }
  
  //   let descriptionText: string = descriptionControl.value.trim();
  
  //   alert("Generating suggestion based on: " + descriptionText);
  
  //   this.chatbotService.sendDescription(descriptionText).subscribe(
  //     (data: string | string[]) => {
  //       this.aisugggestion = Array.isArray(data) ? data : [data]; 
  //     },
  //     (error) => {
  //       console.error("Error:", error);
  //       alert("Failed to generate a suggestion. Please try again.");
  //     }
  //   );
  // }  
}
