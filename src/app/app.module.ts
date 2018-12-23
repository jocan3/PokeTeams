import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here

import { AppComponent } from './app.component';
import { TeamsComponent, DataDialog } from './teams/teams.component';
import { BattleIdsDialog } from './teams/teams.component';
import { TeamDetailComponent } from './team-detail/team-detail.component';
import { TeamService } from './team.service';
import { AppRoutingModule } from './/app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import {MatToolbarModule, MatSidenavModule, MatIconModule, MatListModule,  
  MatButtonModule, MatGridListModule, MatTableModule, MatProgressSpinnerModule, 
    MatPaginatorModule, MatSortModule, MatDialogModule, MatFormFieldModule, MatInputModule,
      MatDatepickerModule, MatNativeDateModule, MatSelectModule} from '@angular/material';
import { FiltersComponent } from './filters/filters.component';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { LoginComponent } from './login/login.component';

export function init_app(teamService: TeamService) {
  return () => teamService.loadFormatList();
}

@NgModule({
  declarations: [
    AppComponent,
    TeamsComponent,
    TeamDetailComponent,
    DashboardComponent,
    BattleIdsDialog,
    DataDialog,
    FiltersComponent,
    LoginComponent
  ],
  entryComponents: [
    BattleIdsDialog,
    DataDialog
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatGridListModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    DeviceDetectorModule.forRoot()
  ],
  providers: [
    TeamService,
    { provide: APP_INITIALIZER, useFactory: init_app, deps: [TeamService],multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
