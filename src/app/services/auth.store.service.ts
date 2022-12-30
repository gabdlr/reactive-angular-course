import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { User } from '../model/user';
import { BrowserStorageService } from './browser-storage.service';

const AUTH_DATA = 'auth_data';

@Injectable({
  providedIn: 'root'
})
export class AuthStoreService {
  
  auth$: Observable<User>;
  isLoggedIn$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>;
  user$: Observable<User>;
  private subject: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  constructor(private httpClient: HttpClient,private browserStorageService: BrowserStorageService) {
    this.user$ = this.subject.asObservable();
    this.isLoggedIn$ = this.user$
      .pipe(
        map(user => !!user)
      );
    this.isLoggedOut$ = this.isLoggedIn$
      .pipe(
        map( loggedIn => !loggedIn)
      );

    const user = this.browserStorageService.get(AUTH_DATA);
    if(user){
      this.subject.next(JSON.parse(user));
    }
  }

  login(email: string, password: string): Observable<User>{
    return this.httpClient.post<User>("/api/login", {email,password})
            .pipe(
              tap(user => {
                this.subject.next(user);
                this.browserStorageService.set(AUTH_DATA,JSON.stringify(user));
              }),
              shareReplay()
            );
  }

  logout(){
    this.subject.next(null);
    this.browserStorageService.remove(AUTH_DATA);
  }
}
