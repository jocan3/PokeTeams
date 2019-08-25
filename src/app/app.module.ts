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
      MatDatepickerModule, MatNativeDateModule, MatSelectModule, MatRadioModule, MatCheckboxModule, MatCardModule, MatTabsModule, MatProgressBarModule} from '@angular/material';
import { FiltersComponent } from './filters/filters.component';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { LoginComponent } from './login/login.component';
import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider,
} from "angular5-social-login";
import { AuthService } from './auth.service';
import { AuthGuardService } from './auth-guard.service';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { ActionButtonComponent } from './action-button/action-button.component';

export function init_app(teamService: TeamService, authService: AuthService) {
  return () => 
    forkJoin([
    teamService.loadFormatList(),
    authService.loadAuthenticationData()
  ]).toPromise(); 
}

export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
      [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider("458275609427-3e1eqafm8d1qvpg746v173b5dka26vki.apps.googleusercontent.com")
        }
      ]
  );
  return config;
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
    LoginComponent,
    ActionButtonComponent
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
    MatRadioModule,
    MatCheckboxModule,
    MatCardModule,
    MatGridListModule,
    MatTabsModule,
    DeviceDetectorModule.forRoot(),
    SocialLoginModule,
    MatIconModule,
    MatProgressBarModule
  ],
  providers: [
    TeamService,
    AuthService,
    AuthGuardService,
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    },
    { provide: APP_INITIALIZER, useFactory: init_app, deps: [TeamService, AuthService],multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
