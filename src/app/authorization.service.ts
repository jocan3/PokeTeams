import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AuthorizationService {

  loggedIn: boolean = false;
  private authURL = "https://twiz8b762f.execute-api.us-east-1.amazonaws.com/prod/GetAuthList";

  constructor(private http: HttpClient) { }

  getAuthList(): Observable<string[]> { 
		return this.http.get<string[]>(this.authURL);
  }
  
  isAuthorized(): Observable<boolean> {
    return new Observable<false>();
  }

}
