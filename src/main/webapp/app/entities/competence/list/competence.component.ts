import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICompetence } from '../competence.model';
import { CompetenceService } from '../service/competence.service';
import { CompetenceDeleteDialogComponent } from '../delete/competence-delete-dialog.component';

@Component({
  selector: 'jhi-competence',
  templateUrl: './competence.component.html',
})
export class CompetenceComponent implements OnInit {
  competences?: ICompetence[];
  isLoading = false;

  constructor(protected competenceService: CompetenceService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.competenceService.query().subscribe({
      next: (res: HttpResponse<ICompetence[]>) => {
        this.isLoading = false;
        this.competences = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(_index: number, item: ICompetence): number {
    return item.id!;
  }

  delete(competence: ICompetence): void {
    const modalRef = this.modalService.open(CompetenceDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.competence = competence;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
