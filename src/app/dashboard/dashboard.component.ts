import { Component, OnInit } from '@angular/core';
import { Team } from '../team';
import { TeamService } from '../team.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  teams: Team[] = [];

  constructor(private teamService: TeamService) { }

  ngOnInit() {
    this.getTeams();
  }

  getTeams(): void {
    this.teamService.getTeams()
      .subscribe(teams => this.teams = teams.slice(0, 4));
  }
}