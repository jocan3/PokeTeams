import { Injectable } from '@angular/core';
import {
  SocialUser,
  AuthService as SocialAuthService,
  FacebookLoginProvider,
  GoogleLoginProvider
} from 'angular5-social-login';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AuthService {

  constructor(private socialAuthService: SocialAuthService, private http: HttpClient) { }

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
    return this.user != null ;
  }

  public loadAuthenticationData(): Observable<any> {
    return new Observable(observer => {
      this.socialAuthService.authState.subscribe(
        socialUser => {
            if (socialUser) {
              this.getAuthorized(socialUser).subscribe(
                (result) =>{
                  if (result['authorized']) {
                    this.user = socialUser;
                  }
                  observer.next();
                  observer.complete();
                },
                (error) => {
                  observer.next();
                  observer.complete();
                }
              );
          } else {
            observer.next();
            observer.complete();
          }
        },
        error => {
          observer.next();
          observer.complete();
        }
      )
    });
  }

  getAuthorized(socialUser: SocialUser): Observable<any> { 
		return this.http.get('http://jocan3.com:3000/Authenticate?' + 'email=' + socialUser.email + '&token=' + socialUser.idToken)
		//	.pipe(
		//      catchError(this.handleError<TrendReport>('getTeams'))
		//    );
	}

}
