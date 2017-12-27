import { Injectable } from '@angular/core';
import { Team } from './team';
import { TEAMS } from './mock-teams';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class TeamService {

  constructor() { }

  getTeams(): Observable<Team[]> {
    return of(TEAMS);
  }

  getTeam(id: number): Observable<Team> {
	  return of(TEAMS.find(team => +team.id === id));
  }

}
