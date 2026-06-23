import { Injectable } from '@angular/core';
import { environment } from '../../../Environments/environment';
import { HttpClient } from '@angular/common/http';
import { LoginCommand } from '../../../Models/onboarding/LoginCommand';
import { Observable } from 'rxjs';
import { LoginResponse } from '../../../Models/onboarding/LoginResponse';

@Injectable({
  providedIn: 'root',
})
export class Onboarding {

  private readonly apiUrl = `${environment.apiUrl}/onboarding`;

  constructor(private http: HttpClient) {}

  // Add onboarding methods here, e.g., registerUser, completeProfile, etc.

  LoginUser(login: LoginCommand): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, login);
  }


  RegisterUser(register: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, register);
  }


  

}