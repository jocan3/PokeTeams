import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Pokemon } from '../pokemon';
import { Team } from '../team';
import { TeamService } from '../team.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit, AfterViewInit {

  teams: Team[];
  displayedColumns = ['team', 'usage_count', 'win_count', 'relevance'];
  dataSource = new MatTableDataSource<Team>();
  startDate : string;
  endDate: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private teamService: TeamService) {
  }

  getTeams(): void {
    var startDate = new Date();
    var endDate = new Date();
    var dayOfMonth = startDate.getDate();
    startDate.setDate(dayOfMonth - 15);
    this.startDate = startDate.toLocaleDateString("en-US")
    this.endDate = endDate.toLocaleDateString("en-US")
  	this.teamService.getTeams(startDate.toLocaleDateString("en-US"), endDate.toLocaleDateString("en-US"))
  			.subscribe(teams => {
          this.teams = teams.items;
          this.dataSource.data = this.teams;
        });
  }
  
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {
  	this.getTeams();
  }

}
