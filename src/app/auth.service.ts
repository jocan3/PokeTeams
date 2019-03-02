import { Injectable } from '@angular/core';
import {
  SocialUser,
  AuthService as SocialAuthService,
  FacebookLoginProvider,
  GoogleLoginProvider
} from 'angular5-social-login';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AuthService {

  constructor(private socialAuthService: SocialAuthService) { }

  _user: SocialUser;

  onUserChanged: Subject<any> = new Subject();

  get user(): SocialUser {
    return this._user;
  }

  set user(value: SocialUser) {
    this._user = value;
    this.onUserChanged.next(this._user);
  }

  public isAuthenticated(): boolean {
    return this.user != null;
  }

  public loadAuthenticationData(): Observable<any> {
    return new Observable(observer => {
      this.socialAuthService.authState.subscribe(
        socialUser => {
          this.user = socialUser;
          observer.next();
          observer.complete();
        },
        error => {
          observer.next();
          observer.complete();
        }
      )
    });
  }

}
