import { Injectable } from '@angular/core';
import { Team } from './team';
import { TrendReport } from './trend-report';
import { TEAMS } from './mock-teams';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class TeamService {
  
	private teamsUrl = 'https://s5pze687i8.execute-api.us-east-2.amazonaws.com/test/GetPokemonSDTeamTrendReport?format=gen7vgc2018';  // URL to web api
	private teamsUrl2 = 'https://jsonplaceholder.typicode.com/users';
	constructor(private http: HttpClient) { }

	getTeams(startDate: string, endDate: string): Observable<TrendReport> { 
		return this.http.get<TrendReport>(this.teamsUrl + '&startDate='+ startDate +'&endDate='+ endDate)
			.pipe(
		      catchError(this.handleError<TrendReport>('getTeams'))
		    );
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
