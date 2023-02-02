import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ICompetence, Competence } from '../competence.model';

import { CompetenceService } from './competence.service';

describe('Competence Service', () => {
  let service: CompetenceService;
  let httpMock: HttpTestingController;
  let elemDefault: ICompetence;
  let expectedResult: ICompetence | ICompetence[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(CompetenceService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      name: 'AAAAAAA',
      level: 0,
    };
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = Object.assign({}, elemDefault);

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(elemDefault);
    });

    it('should create a Competence', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new Competence()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Competence', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          name: 'BBBBBB',
          level: 1,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Competence', () => {
      const patchObject = Object.assign({}, new Competence());

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Competence', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          name: 'BBBBBB',
          level: 1,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toContainEqual(expected);
    });

    it('should delete a Competence', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addCompetenceToCollectionIfMissing', () => {
      it('should add a Competence to an empty array', () => {
        const competence: ICompetence = { id: 123 };
        expectedResult = service.addCompetenceToCollectionIfMissing([], competence);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(competence);
      });

      it('should not add a Competence to an array that contains it', () => {
        const competence: ICompetence = { id: 123 };
        const competenceCollection: ICompetence[] = [
          {
            ...competence,
          },
          { id: 456 },
        ];
        expectedResult = service.addCompetenceToCollectionIfMissing(competenceCollection, competence);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Competence to an array that doesn't contain it", () => {
        const competence: ICompetence = { id: 123 };
        const competenceCollection: ICompetence[] = [{ id: 456 }];
        expectedResult = service.addCompetenceToCollectionIfMissing(competenceCollection, competence);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(competence);
      });

      it('should add only unique Competence to an array', () => {
        const competenceArray: ICompetence[] = [{ id: 123 }, { id: 456 }, { id: 473 }];
        const competenceCollection: ICompetence[] = [{ id: 123 }];
        expectedResult = service.addCompetenceToCollectionIfMissing(competenceCollection, ...competenceArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const competence: ICompetence = { id: 123 };
        const competence2: ICompetence = { id: 456 };
        expectedResult = service.addCompetenceToCollectionIfMissing([], competence, competence2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(competence);
        expect(expectedResult).toContain(competence2);
      });

      it('should accept null and undefined values', () => {
        const competence: ICompetence = { id: 123 };
        expectedResult = service.addCompetenceToCollectionIfMissing([], null, competence, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(competence);
      });

      it('should return initial array if no Competence is added', () => {
        const competenceCollection: ICompetence[] = [{ id: 123 }];
        expectedResult = service.addCompetenceToCollectionIfMissing(competenceCollection, undefined, null);
        expect(expectedResult).toEqual(competenceCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
