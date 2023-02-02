import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ICompetence } from '../competence.model';
import { CompetenceService } from '../service/competence.service';

@Component({
  templateUrl: './competence-delete-dialog.component.html',
})
export class CompetenceDeleteDialogComponent {
  competence?: ICompetence;

  constructor(protected competenceService: CompetenceService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.competenceService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
