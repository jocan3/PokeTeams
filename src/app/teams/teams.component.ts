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
  displayedColumns = ['team', 'usage_count', 'win_count', 'users_count', 'usage_ratio', 'win_ratio', 'ladder_rank','relevance'];
  dataSource = new MatTableDataSource<Team>();
  startDate : string;
  endDate: string;
  formatDisplayName: string;
  loading: boolean = false;
  errorMessage: string;
  searchBy: string = "pokemon";
  username: string;

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
    let formatStr = this.route.snapshot.paramMap.get('format');
    let ladderReport = this.route.snapshot.paramMap.get('ladderReport') == "true" ? true : false;
    let startDate = new Date();
    let endDate = new Date();
    let dayOfMonth = startDate.getDate();
    let format = this.teamService.formatList.find((format)=>format.default == true).name;
    startDate.setDate(dayOfMonth - 15);
    if (startDateStr && endDateStr && formatStr) {
      startDate = new Date(0);
      endDate = new Date(0);
      startDate.setTime(Number(startDateStr)*1000);
      endDate.setTime(Number(endDateStr)*1000);
      format = formatStr;
    }
    this.formatDisplayName = this.teamService.formatList.find((f)=>f.name == format).displayName;
    this.startDate = startDate.toLocaleDateString("en-US");
    this.endDate = endDate.toLocaleDateString("en-US");
    this.loading = true;
  	this.teamService.getTeams(format, Math.floor(startDate.getTime()/1000), Math.floor(endDate.getTime()/1000), ladderReport)
  			.subscribe(teams => {
          this.teams = teams.items;
          this.dataSource.data = this.teams;
          this.loading = false;
        },(error) => {
          console.log(error);
          this.loading = false;
          if (error.status == 401) {
            this.errorMessage = "You don't have access to see this page."
          } else {
            this.errorMessage = "There was an error getting the report. Please try again later."
          }
        });
  }

  seeBattleIds(battle_ids): void {
    let filteredBattleIds = battle_ids;
    if (this.searchBy == "username") {
      filteredBattleIds = battle_ids.filter( b => b.username.indexOf(this.username) != -1);
    }
    let dialogRef = this.dialog.open(BattleIdsDialog, {
      width: '30em',
      data: { battle_ids: filteredBattleIds }
    });
  }
  
  seeData(data): void {
    if (data) {
      var dataStats = {};
      var columns = [];
      data.forEach(element => {
        if (element) {
          var dataKeys = Object.keys(element);
          dataKeys.forEach(dataKey => {
            if (columns.indexOf(dataKey) == -1) {
              columns.push(dataKey);
              dataStats[dataKey] = {};
            }
          });
        }
      });

      var dataMap = {};

      data.forEach(element => {
        if (element) {
          columns.forEach((col)=>{
            if (!element[col]) {
              element[col] = {
                moves: [],
                abilities: [],
                items: []
              };
            }
          });

          var elementStr = JSON.stringify(element);
          if (!dataMap[elementStr]) {
            dataMap[elementStr] = true;
            this.fillDataStats(dataStats, element);
          } else {
            element = null;
          }
        }
      });
      let teamData = new MatTableDataSource();
      teamData.data = data.filter((element) => element != null);

      let teamDataStats = new MatTableDataSource();
      teamDataStats.data = [dataStats];

      console.log(teamDataStats.data);

      let dialogRef = this.dialog.open(DataDialog, {
        width: '60em',
        data: { teamData: teamData, columnsList: columns, teamDataStats: teamDataStats }
      });
    }
  }

  private fillDataStats(dataStats, element) {
    Object.keys(dataStats).forEach((col) => {
      let values = element[col].moves.concat(element[col].abilities).concat(element[col].items);
      values.forEach(value => {
        if (dataStats[col][value]) {
          dataStats[col][value] ++;
        } else {
          dataStats[col][value] = 1;
        }
      });
    });
  }

  private isDataElementContained(dataElement, elementList): boolean {
    let result: boolean = true;
    let keys = Object.keys(dataElement);
    for (var i=0; i < elementList.length && result; ++i) {
       let element = elementList[i];
       for (var j=0; j < keys.length && result; ++j) {
          let col = keys[j];
          let values1 = dataElement[col].moves.concat(dataElement[col].abilities).concat(dataElement[col].items);
          let values2 = element[col].moves.concat(element[col].abilities).concat(element[col].items);
          values1.array.forEach(value => {
            if (values2.indexOf(value) == -1) {
              result = false;
            }
          });
       }
    }
    return result;
  }

  setPokemonFilterPredicate() {
    this.username = "";
    this.dataSource.filterPredicate = (data: Team, filter: string) => {
      if (!filter) return true;
      var tokens = filter.split(' ');
      for (var i =0; i < tokens.length; ++i) {
        if (data.team.toLowerCase().indexOf(tokens[i]) == -1) {
          return false;
        }
      }
      return true;
    }
  }
  
  setUsernameFilterPredicate() {
    this.dataSource.filterPredicate = (data: Team, filter: string) => {
      if (!filter) return true;
      this.username = filter;
      let matches = data.battle_ids.filter(b => { return b.username.indexOf(this.username) != -1; })
      return matches.length > 0;
    }
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
    this.setPokemonFilterPredicate();
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


@Component({
  selector: 'data-dialog',
  templateUrl: 'data-dialog.html',
})
export class DataDialog {

  constructor(
    public dialogRef: MatDialogRef<DataDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getKeys(object) {
    return Object.keys(object);
  }

};
