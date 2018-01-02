import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamsComponent }      from './teams/teams.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { TeamDetailComponent }  from './team-detail/team-detail.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

const routes: Routes = [
  { path: '', redirectTo: '/teams', pathMatch: 'full' },
  { path: 'teams', component: TeamsComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: TeamDetailComponent }
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
})
export class AppRoutingModule {}