import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { CompetenceComponent } from '../list/competence.component';
import { CompetenceDetailComponent } from '../detail/competence-detail.component';
import { CompetenceUpdateComponent } from '../update/competence-update.component';
import { CompetenceRoutingResolveService } from './competence-routing-resolve.service';

const competenceRoute: Routes = [
  {
    path: '',
    component: CompetenceComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CompetenceDetailComponent,
    resolve: {
      competence: CompetenceRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CompetenceUpdateComponent,
    resolve: {
      competence: CompetenceRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CompetenceUpdateComponent,
    resolve: {
      competence: CompetenceRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(competenceRoute)],
  exports: [RouterModule],
})
export class CompetenceRoutingModule {}
