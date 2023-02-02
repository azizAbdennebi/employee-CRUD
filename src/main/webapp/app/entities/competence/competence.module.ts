import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { CompetenceComponent } from './list/competence.component';
import { CompetenceDetailComponent } from './detail/competence-detail.component';
import { CompetenceUpdateComponent } from './update/competence-update.component';
import { CompetenceDeleteDialogComponent } from './delete/competence-delete-dialog.component';
import { CompetenceRoutingModule } from './route/competence-routing.module';

@NgModule({
  imports: [SharedModule, CompetenceRoutingModule],
  declarations: [CompetenceComponent, CompetenceDetailComponent, CompetenceUpdateComponent, CompetenceDeleteDialogComponent],
  entryComponents: [CompetenceDeleteDialogComponent],
})
export class CompetenceModule {}
