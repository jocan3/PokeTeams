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
    var startDate = new Date();
    var endDate = new Date();
    var dayOfMonth = startDate.getDate();
    startDate.setDate(dayOfMonth - 1);
    this.teamService.getTeams("", startDate.getTime(), endDate.getTime(), null)
      .subscribe(teams => this.teams = teams.items.slice(0, 4));
  }
}