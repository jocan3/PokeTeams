import { Component, OnInit, ViewChild, AfterViewInit, Inject, ChangeDetectorRef } from '@angular/core';
import { Pokemon } from '../pokemon';
import { Team } from '../team';
import { TeamService } from '../team.service';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatFormField, MatInput } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Route, ActivatedRoute } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Angular5Csv } from 'angular5-csv/dist/Angular5-csv';
import { FormControl, Validators } from '@angular/forms';

declare let gtag: Function; // Declare ga (google analytics) as a function

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit, AfterViewInit {

  teams: Team[];
  displayedColumns = ['team', 'usage_count', 'win_count', 'users_count', 'usage_ratio', 'win_ratio','relevance', 'summary','actions'];
  dataSource = new MatTableDataSource<Team>();
  startDate : string;
  endDate: string;
  formatDisplayName: string;
  loading: boolean = false;
  errorMessage: string;
  searchBy: string = "pokemon";
  username: string;
  showActionsMobile: boolean = false;
  lastSelected: Team;
  datasets: any[];
  selectedDataset: string;
  renderedData: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private teamService: TeamService, public dialog: MatDialog, 
    private route: ActivatedRoute, private deviceService: DeviceDetectorService,
    private changeDetectorRef: ChangeDetectorRef) {}

  exportCsv(){
    let dataToExport = this.dataSource.data.map((value)=> {
      return {
        "team" : value.team,
        "usage_count" : value.usage_count,
        "usage_ratio" : value.usage_ratio,
        "users_count" : value.users_count,
        "users_ratio" : value.users_ratio,
        "win_count" : value.win_count,
        "win_ratio" : value.win_ratio,
        "relevance" : value.relevance
      }
    });
    new Angular5Csv(dataToExport,'vgcteams_' + new Date().getTime(),
    {headers: ["team", "usage_count", "usage_ratio", "users_count", "users_ratio", "win_count", "win_ratio", "relevance"]});
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  getTeams(): void {
    this.loading = true;
  	this.teamService.getTeams(this.selectedDataset)
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

  onDatasetSelectionChange() {
    gtag('event', 'change_selected_dataset', {
      'event_category' : 'report_interaction',
      'event_label' : this.selectedDataset
    });
    this.getTeams();
  }

  seeBattleIds(battle_ids_wins, battle_ids_losses, team): void {

    gtag('event', 'click_replays_button', {
      'event_category' : 'report_interaction',
      'event_label' : team
    });

    let filteredBattleIdsLosses = battle_ids_losses;
    let filteredBattleIdsWins = battle_ids_wins;
    if (this.searchBy == "username") {
      filteredBattleIdsLosses = battle_ids_losses.filter( b => b.username.toLowerCase().indexOf(this.username.toLowerCase()) != -1);
      filteredBattleIdsWins = battle_ids_wins.filter( b => b.username.toLowerCase().indexOf(this.username.toLowerCase()) != -1);
    }
    let dialogRef = this.dialog.open(BattleIdsDialog, {
      width: '30em',
      data: { battle_ids_wins: filteredBattleIdsWins, battle_ids_losses: filteredBattleIdsLosses }
    });
  }

  seeEmailSubscribeDialog(): void {

    gtag('event', 'click_get_notifications_button', {
      'event_category' : 'report_interaction'
    });

    let dialogRef = this.dialog.open(EmailSubscribeDialog, {
      width: '30em'
    });
  }
  
  seeData(data, lead, team): void {

    gtag('event', 'click_data_button', {
      'event_category' : 'report_interaction',
      'event_label' : team
    });

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

      let dialogRef = this.dialog.open(DataDialog, {
        width: '60em',
        data: { teamData: teamData, columnsList: columns, dataStats: dataStats, leads: lead }
      });
    }
  }

  showMobileActions(element: Team) {
    if (this.lastSelected) {
      this.lastSelected.show_actions = false;
    }
    element.show_actions = true;
    this.lastSelected = element;
  }

  private fillDataStats(dataStats, element) {
    Object.keys(dataStats).forEach((col) => {

      dataStats[col]['moves'] = dataStats[col]['moves'] ? dataStats[col]['moves'] : {};
      dataStats[col]['abilities'] = dataStats[col]['abilities'] ? dataStats[col]['abilities'] : {};
      dataStats[col]['items'] = dataStats[col]['items'] ? dataStats[col]['items'] : {};

      let values = element[col].moves;      
      values.forEach(value => {
        if (dataStats[col].moves[value]) {
          dataStats[col].moves[value]++;
        } else {
          dataStats[col].moves[value] = 1;
        }
      });

      values = element[col].abilities;      
      values.forEach(value => {
        if (dataStats[col].abilities[value]) {
          dataStats[col].abilities[value]++;
        } else {
          dataStats[col].abilities[value] = 1;
        }
      });

      values = element[col].items;      
      values.forEach(value => {
        if (dataStats[col].items[value]) {
          dataStats[col].items[value]++;
        } else {
          dataStats[col].items[value] = 1;
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
      let matches = data.battle_ids.filter(b => { return b.username.toLowerCase().indexOf(this.username.toLowerCase()) != -1; })
      return matches.length > 0;
    }
  }

  searchInputFocusout() {
    gtag('event', 'focusout_search_input', {
      'event_category' : 'report_interaction',
      'event_label' : this.dataSource.filter
    });
  }

  searchInputFocus() {
    gtag('event', 'focus_search_input', {
      'event_category' : 'report_interaction'
    });
  }

  isMobile(): boolean {
    var deviceInfo = this.deviceService.getDeviceInfo();
    return deviceInfo.device =='android' || deviceInfo.device == 'iphone';
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {
    this.datasets = this.teamService.datasets;
    this.selectedDataset = this.datasets.find( (dataset) => dataset.default == true).name;
    this.getTeams();
    this.setPokemonFilterPredicate();
  }

};

@Component({
  selector: 'email-subscribe-dialog',
  templateUrl: 'email-subscribe-dialog.html',
})
export class EmailSubscribeDialog {

  email: any;
  saving: boolean = false;
  message: string = null;

  constructor(
    public dialogRef: MatDialogRef<EmailSubscribeDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public service: TeamService) { 
      this.email = new FormControl('', [Validators.required, Validators.email]);
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  subscribeEmail() {
    this.saving = true;
    this.service.subscribeEmail(this.email.value).subscribe(
      (result) => {
        this.message = "Thanks. Please check your email and verify/confirm your account.";
      },
      (error) => {
        this.message = "An error occurred while saving your email. Please try again later."
      }
    )
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

  seeBattleReplay(battleId: string) {
    gtag('event', 'click_battle_replay_external_link', {
      'event_category' : 'report_interaction',
      'event_label' : battleId
    });
  }

};


@Component({
  selector: 'data-dialog',
  templateUrl: 'data-dialog.html',
})
export class DataDialog {

  constructor(
    public dialogRef: MatDialogRef<DataDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private deviceService: DeviceDetectorService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getKeys(object) {
    return Object.keys(object);
  }

  getSortedKeys(object) {
    let keys = Object.keys(object);
    return keys.sort((a,b) => object[b] - object[a]);
  }

  getPercentage(value, object) {
    let sum: number = Object.values(object).reduce((a: number,b: number)=> a + b) as number;
    return (value/sum)*100;
  }

  getTotal(object) {
    return Object.values(object).reduce((a: number,b: number)=> a + b) as number;
  }

  isMobile(): boolean {
    var deviceInfo = this.deviceService.getDeviceInfo();
    return deviceInfo.device.toLowerCase() =='android' || deviceInfo.device.toLowerCase() == 'iphone';
  }

  getNumberOfColumns(): number {
    if (this.isMobile()) {
      return 1;
    } else {
      return 3;
    }
  }

};
