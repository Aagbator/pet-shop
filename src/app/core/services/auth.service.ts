// Copyright The Linux Foundation and each contributor to LFX.
// SPDX-License-Identifier: MIT

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAuthPayload, IAuthResponse } from '../model/auth.interface';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  authUrl = environment.apiUrl + 'user';

  private isLoginSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.isAuthenticated());

  constructor( private http: HttpClient, private storageService: StorageService, private router: Router) {}

  private isAuthenticated() : boolean {
    return !!localStorage.getItem('authenticated');
  }

  isLoggedIn() : Observable<boolean> {
    return this.isLoginSubject.asObservable();
  }

  setIsLoggedIn() {
    this.storageService.setLocalStorage('authenticated', true)
    this.isLoginSubject.next(true);
  }

  login(authPayload: IAuthPayload): Observable<IAuthResponse> {
    const {username, password} = authPayload;
    return this.http.get<IAuthResponse>(`${this.authUrl}/login?username=${username}&password=${password}`);
  }

  logout() : void {
    localStorage.removeItem('authenticated');
    this.isLoginSubject.next(false);
    this.router.navigate(['/login']);
  }
}
