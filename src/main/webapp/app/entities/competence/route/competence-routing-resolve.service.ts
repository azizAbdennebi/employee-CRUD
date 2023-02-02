import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICompetence, Competence } from '../competence.model';
import { CompetenceService } from '../service/competence.service';

@Injectable({ providedIn: 'root' })
export class CompetenceRoutingResolveService implements Resolve<ICompetence> {
  constructor(protected service: CompetenceService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICompetence> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((competence: HttpResponse<Competence>) => {
          if (competence.body) {
            return of(competence.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Competence());
  }
}
