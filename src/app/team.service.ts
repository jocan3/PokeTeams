import { Injectable } from '@angular/core';
import { Team } from './team';
import { TrendReport } from './trend-report';
import { TEAMS } from './mock-teams';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Format } from './format.model';
import { AuthService } from './auth.service';

@Injectable()
export class TeamService {
	
	private teamsUrl = 'http://jocan3.com:3000/GetPokemonSDTeamTrendReport?';  // URL to web api
	private teamsCurrentUrl = 'http://jocan3.com:3000/GetPokemonSDTeamTrendReportCurrent?';  // URL to web api

	// private teamsUrl = 'https://wm6zl46tuf.execute-api.us-east-1.amazonaws.com/prod/GetPokemonSDTeamTrendReport?format=gen7vgc2018';  // URL to web api
	private teamsUrl2 = 'https://jsonplaceholder.typicode.com/users';

	private formatsURL = 'http://jocan3.com:3000/GetFormatList';

	formatList: Format[] = [];

	constructor(private http: HttpClient, private auth: AuthService) { }

	getTeams(format:string, startDate: number, endDate: number, ladderReport: boolean): Observable<TrendReport> { 
		return this.http.get<TrendReport>(this.teamsUrl + 'format=' + format + '&email=' + this.auth.user.email + '&token=' + this.auth.user.idToken + '&startDate='+ startDate +'&endDate='+ endDate + (ladderReport ? "&ladderReport=true" : ""))
		//	.pipe(
		//      catchError(this.handleError<TrendReport>('getTeams'))
		//    );
	}

	getTeamsCurrent(ladderReport: boolean): Observable<TrendReport> { 
		return this.http.get<TrendReport>(this.teamsCurrentUrl + 'email=' + this.auth.user.email + '&token=' + this.auth.user.idToken + (ladderReport ? "&ladderReport=true" : ""))
		//	.pipe(
		//      catchError(this.handleError<TrendReport>('getTeams'))
		//    );
	}

	loadFormatList(): Promise<any> {
		const promise = this.http.get<Format[]>(this.formatsURL)
      .toPromise()
      .then(formats => {
				this.formatList = formats;
      });
 
    return promise;
	}

	posts: Observable<any>;
	getUsers() {
	  console.log('calling get!');
	  this.http.get('https://jsonplaceholder.typicode.com/users').pipe(
			  tap(users => console.log(users))).subscribe(p => {console.log(p);});
	  console.log('calling get finish!');  
	}

	getTeam(id: number): Observable<Team> {
	  return of(TEAMS.find(team => +team.id === id));
	}

	  /**
	 * Handle Http operation that failed.
	 * Let the app continue.
	 * @param operation - name of the operation that failed
	 * @param result - optional value to return as the observable result
	 */
	private handleError<T> (operation = 'operation', result?: T) {
	  return (error: any): Observable<T> => {

	    // TODO: send the error to remote logging infrastructure
	    console.error(error); // log to console instead

	    // Let the app keep running by returning an empty result.
	    return of(result as T);
	  };
	}

}
