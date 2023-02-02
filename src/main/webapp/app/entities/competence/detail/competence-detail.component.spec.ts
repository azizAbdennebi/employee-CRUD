import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CompetenceDetailComponent } from './competence-detail.component';

describe('Competence Management Detail Component', () => {
  let comp: CompetenceDetailComponent;
  let fixture: ComponentFixture<CompetenceDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompetenceDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ competence: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(CompetenceDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(CompetenceDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load competence on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.competence).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
