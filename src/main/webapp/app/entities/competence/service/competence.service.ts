import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICompetence, getCompetenceIdentifier } from '../competence.model';

export type EntityResponseType = HttpResponse<ICompetence>;
export type EntityArrayResponseType = HttpResponse<ICompetence[]>;

@Injectable({ providedIn: 'root' })
export class CompetenceService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/competences');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(competence: ICompetence): Observable<EntityResponseType> {
    return this.http.post<ICompetence>(this.resourceUrl, competence, { observe: 'response' });
  }

  update(competence: ICompetence): Observable<EntityResponseType> {
    return this.http.put<ICompetence>(`${this.resourceUrl}/${getCompetenceIdentifier(competence) as number}`, competence, {
      observe: 'response',
    });
  }

  partialUpdate(competence: ICompetence): Observable<EntityResponseType> {
    return this.http.patch<ICompetence>(`${this.resourceUrl}/${getCompetenceIdentifier(competence) as number}`, competence, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICompetence>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICompetence[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addCompetenceToCollectionIfMissing(
    competenceCollection: ICompetence[],
    ...competencesToCheck: (ICompetence | null | undefined)[]
  ): ICompetence[] {
    const competences: ICompetence[] = competencesToCheck.filter(isPresent);
    if (competences.length > 0) {
      const competenceCollectionIdentifiers = competenceCollection.map(competenceItem => getCompetenceIdentifier(competenceItem)!);
      const competencesToAdd = competences.filter(competenceItem => {
        const competenceIdentifier = getCompetenceIdentifier(competenceItem);
        if (competenceIdentifier == null || competenceCollectionIdentifiers.includes(competenceIdentifier)) {
          return false;
        }
        competenceCollectionIdentifiers.push(competenceIdentifier);
        return true;
      });
      return [...competencesToAdd, ...competenceCollection];
    }
    return competenceCollection;
  }
}
