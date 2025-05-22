import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface suggestiontable {
  bug: {
    id : number;
  }
  suggestions:string
}


@Injectable({
  providedIn: 'root',
})



export class ChatbotService {
  private apiUrl = 'http://localhost:9090/api/chat';
  private apisuggestioin = 'http://localhost:9090/api/suggestion/'


  constructor(private http: HttpClient) { }

  // sendMessage(message: string): Observable<any> {
  //   console.log("I am bot")
  //   const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  //   return this.http.post(this.apiUrl, { message }, { headers, responseType: 'json' });
  // }

  // sendMessage(message: string): Observable<string> {
  //   const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  //   return this.http.post(this.apiUrl, { message }, { headers, responseType: 'text' }); // Change responseType to 'text'
  // }
  sendMessage(message: string): Observable<string> {
    return this.http.post(this.apiUrl, message, { responseType: 'text' }); // Handle plain text response
  }

  // sendDescription(message: string): Observable<string> {
  //   return this.http.post(`${this.apiUrl}/ai/suggestions`, message, { responseType: 'text' }); // Handle plain text response
  // }

  sendDescription(description: string): Observable<string[]> {
    return this.http.post<string[]>(`${this.apiUrl}/ai/suggestions`, description, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  addSuggestion(suggestion: any): Observable<[any]> {
    console.log("Added suggestion")
    console.log(suggestion)
    return this.http.post<[any]>(`${this.apisuggestioin}`, suggestion);
  }

  getSuggestionByBug_Id(bugid:number){
    return this.http.get<suggestiontable>(`${this.apisuggestioin}bug/${bugid}`)
  }

}
