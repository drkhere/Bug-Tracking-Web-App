import { Component } from '@angular/core';
import { ChatbotService } from '../chatbot.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatCard, MatCardHeader, MatCardModule } from '@angular/material/card';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule, MatTable } from '@angular/material/table';
import { RouterModule } from '@angular/router';

import {  AfterViewChecked } from '@angular/core';
// import { ChatbotService } from '../chatbot.service';
import hljs from 'highlight.js';

@Component({
  selector: 'app-chatbot',
  standalone:true,
  imports:[MatFormFieldModule,MatCardModule, MatButtonModule,CommonModule, FormsModule, MatTableModule, MatIconModule,RouterModule,MatInputModule],
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css'],
})
export class ChatbotComponent{
  
  
  userMessage: string = '';
  botResponse: string = '';

  constructor(private chatbotService: ChatbotService) {}

  sendMessage(): void {
    this.chatbotService.sendMessage(this.userMessage).subscribe(
      (response: string) => {
        this.botResponse = response; // Assign raw code response
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  // userMessage: string = '';
  // botResponse: string = '';

  // constructor(private chatbotService: ChatbotService) {}

  // sendMessage(): void {
  //   this.chatbotService.sendMessage(this.userMessage).subscribe(
  //     (response: string) => {
  //       this.botResponse = response;
  //       this.highlightCode(); // Highlight new response
  //     },
  //     (error) => {
  //       console.error('Error:', error);
  //     }
  //   );
  // }

  // highlightCode() {
    
  //   setTimeout(() => {
  //     document.querySelectorAll('pre code').forEach((block) => {
  //       hljs.highlightElement(block as HTMLElement);
  //     });
  //   }, 100);
  // }

  // ngAfterViewChecked() {
  //   this.highlightCode();
  // }
}
