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
declare var require: any

@Injectable()
export class TeamService {
	
	private teamsUrl = 'http://jocan3.com:3000/GetPokemonSDTeamTrendReport?';  // URL to web api
	// private teamsUrl = 'https://wm6zl46tuf.execute-api.us-east-1.amazonaws.com/prod/GetPokemonSDTeamTrendReport?format=gen7vgc2018';  // URL to web api
	private teamsUrl2 = 'https://jsonplaceholder.typicode.com/users';

	private formatsURL = 'http://jocan3.com:3000/GetFormatList';

	// formatList: Format[] = [];
	datasets: any[];

	constructor(private http: HttpClient, private auth: AuthService) { }

	getHelp(): Observable<string> {
		const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
		return this.http.get<string>('assets/data/help.htm', { headers, responseType: 'text' as 'json'});
	}

	subscribeEmail(email: string): Observable<any> {
		return this.http.get<string>('https://vm0ct6oig1.execute-api.us-east-2.amazonaws.com/default/SubscribeEmailToTopic?email=' + email);
	}

	getTeams(dataset: string): Observable<TrendReport> { 
		// var report = require('../../data/' + dataset);
		// return of(report);
		return this.http.get<TrendReport>('assets/data/' + dataset);

	}

	loadDatasets(): Promise<any> {

		const headerDict = {
			'Cache-Control':  'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
			'Pragma': 'no-cache',
			'Expires': '0'
		}
		
		const requestOptions = {                                                                                                                                                                                 
			headers: new HttpHeaders(headerDict), 
		};

		const promise = this.http.get<any>('assets/data/datasets.json', requestOptions)
      .toPromise()
      .then(datasets => {
				this.datasets = datasets['datasets'];
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
