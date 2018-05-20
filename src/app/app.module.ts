import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here

import { AppComponent } from './app.component';
import { TeamsComponent } from './teams/teams.component';
import { BattleIdsDialog } from './teams/teams.component';
import { TeamDetailComponent } from './team-detail/team-detail.component';
import { TeamService } from './team.service';
import { AppRoutingModule } from './/app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import {MatToolbarModule, MatSidenavModule, MatIconModule, MatListModule,  
  MatButtonModule, MatGridListModule, MatTableModule, MatProgressSpinnerModule, 
    MatPaginatorModule, MatSortModule, MatDialogModule, MatFormFieldModule, MatInputModule,
      MatDatepickerModule, MatNativeDateModule} from '@angular/material';
import { FiltersComponent } from './filters/filters.component';

@NgModule({
  declarations: [
    AppComponent,
    TeamsComponent,
    TeamDetailComponent,
    DashboardComponent,
    BattleIdsDialog,
    FiltersComponent
  ],
  entryComponents: [
    BattleIdsDialog
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
    MatNativeDateModule
  ],
  providers: [TeamService],
  bootstrap: [AppComponent]
})
export class AppModule { }
