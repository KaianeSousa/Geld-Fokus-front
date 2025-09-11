import {HttpClient} from "@angular/common/http";
import {computed, inject, Injectable, PLATFORM_ID, signal} from "@angular/core";
import {User} from "../@types/User";
import { AuthRequest } from "../@types/User/auth.resquest";
import {catchError, finalize, tap} from 'rxjs/operators';
import { AuthResponse } from "../@types/User/auth.response";
import {EMPTY, Observable, ReplaySubject, switchMap} from 'rxjs';
import {isPlatformBrowser} from '@angular/common';
import { UserRegister } from "../@types/UserRegister";

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  private readonly endpoint = 'http://localhost:8080'
  private http = inject(HttpClient);
  currentUser = signal<User | null>(null);
  isLogged = computed(() => !!this.currentUser());

  private initialized$ = new ReplaySubject<boolean>(1);

  private readonly isBrowser: boolean;
  private readonly platformId = inject(PLATFORM_ID);


  constructor() {
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (this.isBrowser) {
      this.fetchCurrentUser().subscribe();
    } else {
      this.initialized$.next(true);
      this.initialized$.complete();
    }
  }

  login(credentials: AuthRequest): Observable<User> {
    return this.http.post<AuthResponse>(`${this.endpoint}/auth/login`, credentials)
      .pipe(
        tap((response: AuthResponse) => {
          localStorage.setItem('token', response.token);
        }),
        switchMap(() => this.fetchCurrentUser())
      );
  }

  authInitialized(): Observable<boolean> {
    return this.initialized$.asObservable();
  }

  logout() {
    this.currentUser.set(null);
    localStorage.removeItem('token');
  }

  private fetchCurrentUser(): Observable<User> {
    const token = this.isBrowser ? localStorage.getItem('token') : null;
    if (!token) {
      this.currentUser.set(null);
      this.initialized$.next(true);
      this.initialized$.complete();
      return EMPTY;
    }

    return this.http.get<User>(`${this.endpoint}/auth/me`).pipe(
      tap(user => this.currentUser.set(user)),
      catchError(() => {
        this.currentUser.set(null);
        localStorage.removeItem('token');
        return EMPTY;
      }),
      finalize(() => {
        this.initialized$.next(true);
        this.initialized$.complete();
      })
    );
  }

  register(credentials: UserRegister): Observable<string> {
    return this.http.post(`${this.endpoint}/user/create-user`, credentials, {responseType: 'text'});
  }
}