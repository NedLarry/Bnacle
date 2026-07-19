import { Injectable } from '@angular/core';
import { environment } from '../../../Environments/environment';
import { HttpClient } from '@angular/common/http';
import { LoginCommand } from '../../../Models/onboarding/LoginCommand';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { LoginResponse } from '../../../Models/onboarding/LoginResponse';
import { UserDashboardModel } from '../../../Models/userDashboardModel';

@Injectable({
  providedIn: 'root',
})
export class Onboarding {

  private readonly apiUrl = `${environment.apiUrl}/onboarding`;
  private readonly USERS_KEY = 'users';
  private readonly USER_CACHE_TTL_MS = 30 * 60 * 1000; // 30 minutes

  constructor(private http: HttpClient) {}

  // Demo branch: network calls are mocked so the app behaves as if hooked to a backend.
  // Real calls are kept below (commented) for when a backend is wired up.

  LoginUser(login: LoginCommand): Observable<LoginResponse> {
    // return this.http.post<LoginResponse>(`${this.apiUrl}/login`, login);
    return of({ Token: 'demo-token', RefreshToken: 'demo-refresh-token' }).pipe(delay(400));
  }


  RegisterUser(register: any): Observable<any> {
    // return this.http.post<any>(`${this.apiUrl}/register`, register);
    return of({ success: true }).pipe(delay(400));
  }

  /**
   * Add a newly registered user to the (mocked) account cache.
   * Persisted in localStorage so it survives beyond the current tab/session.
   */
  registerUser(user: UserDashboardModel): void {
    const users = this.readUsersFromStorage();
    users.push(user);
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
  }

  /**
   * Return registered users still within the 30-minute signup cache window,
   * evicting any expired entries from storage in the process.
   */
  getValidRegisteredUsers(): UserDashboardModel[] {
    const users = this.readUsersFromStorage();
    const now = Date.now();
    const validUsers = users.filter((u) => now - u.RegisteredAt <= this.USER_CACHE_TTL_MS);

    if (validUsers.length !== users.length) {
      localStorage.setItem(this.USERS_KEY, JSON.stringify(validUsers));
    }

    return validUsers;
  }

  private readUsersFromStorage(): UserDashboardModel[] {
    const item = localStorage.getItem(this.USERS_KEY);
    return item ? JSON.parse(item) : [];
  }

}