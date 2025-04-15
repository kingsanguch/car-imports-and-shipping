import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

export interface User {
  email: string;
  token?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$: Observable<User | null> = this.currentUserSubject.asObservable();

  login(email: string, password: string): Observable<boolean> {
    // Dummy authentication logic (replace with API call)
    if (email && password) {
      this.currentUserSubject.next({ email, token: 'dummy-token' });
      return of(true);
    }
    return of(false);
  }

  register(email: string, password: string): Observable<boolean> {
    // Dummy registration logic (replace with API call)
    if (email && password) {
      // Auto-login after registration:
      this.currentUserSubject.next({ email, token: 'dummy-token' });
      return of(true);
    }
    return of(false);
  }

  logout(): void {
    this.currentUserSubject.next(null);
  }

  isAuthenticated(): boolean {
    return !!this.currentUserSubject.value;
  }
}
