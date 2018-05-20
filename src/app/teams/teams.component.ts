import { Component, OnInit, ViewChild, AfterViewInit, Inject } from '@angular/core';
import { Pokemon } from '../pokemon';
import { Team } from '../team';
import { TeamService } from '../team.service';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatFormField, MatInput } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Route, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit, AfterViewInit {

  teams: Team[];
  displayedColumns = ['team', 'usage_count', 'win_count', 'users_count', 'relevance'];
  dataSource = new MatTableDataSource<Team>();
  startDate : string;
  endDate: string;
  loading: boolean = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private teamService: TeamService, public dialog: MatDialog, private route: ActivatedRoute) {
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  getTeams(): void {
    let startDateStr = this.route.snapshot.paramMap.get('startDate');
    let endDateStr = this.route.snapshot.paramMap.get('endDate');
    var startDate = new Date();
    var endDate = new Date();
    var dayOfMonth = startDate.getDate();
    startDate.setDate(dayOfMonth - 15);
    if (startDateStr && endDateStr) {
      startDate = new Date(0);
      endDate = new Date(0);
      startDate.setTime(Number(startDateStr)*1000);
      endDate.setTime(Number(endDateStr)*1000);
    }
    this.startDate = startDate.toLocaleDateString("en-US");
    this.endDate = endDate.toLocaleDateString("en-US");
    this.loading = true;
  	this.teamService.getTeams(Math.floor(startDate.getTime()/1000), Math.floor(endDate.getTime()/1000))
  			.subscribe(teams => {
          this.teams = teams.items;
          this.dataSource.data = this.teams;
          this.loading = false;
        });
  }

  seeBattleIds(battle_ids): void {
    let dialogRef = this.dialog.open(BattleIdsDialog, {
      width: '30em',
      data: { battle_ids: battle_ids }
    });
  }
  
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params =>{
      this.getTeams();
    });
  	this.getTeams();
  }

};

@Component({
  selector: 'battle-ids-dialog',
  templateUrl: 'battle-ids-dialog.html',
})
export class BattleIdsDialog {

  constructor(
    public dialogRef: MatDialogRef<BattleIdsDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

};
