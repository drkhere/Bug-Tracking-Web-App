import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import { User, AdminService } from '../../../admin.service';
import {MatSelectModule} from '@angular/material/select';
import { CommonModule } from '@angular/common';





@Component({
  selector: 'app-adduser',
  changeDetection:ChangeDetectionStrategy.OnPush,
  imports: [MatSelectModule,MatFormFieldModule,MatIconModule,MatInputModule,FormsModule,MatTableModule,MatButtonModule,CommonModule,ReactiveFormsModule],
  templateUrl: './adduser.component.html',
  styleUrl: './adduser.component.css',
})
export class AdduserComponent {
  userForm: FormGroup;

  emailDomainValidator(control: FormControl) {
    const email = control.value;
    if (email && !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      return { invalidEmail: true }; // Error flag
    }
    return null; // Valid email
  }

  constructor(private fb: FormBuilder, private adminService: AdminService) {
    this.userForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, this.emailDomainValidator]],
      role: ['', Validators.required],
      status: ['', Validators.required]
    });
  }

  submitted = false;
  submitUser() {
    this.submitted = true;
    if (this.userForm.invalid) {
      alert('Please fill all required fields correctly.');
      return;
    }

    console.log(this.userForm.value);
    this.adminService.addUser(this.userForm.value).subscribe(
      (response) => {
        console.log(response);
        alert('User added successfully!');
        this.userForm.reset();
        this.submitted= false;
        
        // this.userForm.reset(); // Reset the form after submission
      },
      (error) => {
        alert('Failed to add user.');
        console.error(error);
      }
    );
  }
}
