import { ICompetence } from 'app/entities/competence/competence.model';

export interface ICategory {
  id?: number;
  name?: string | null;
  competences?: ICompetence[] | null;
}

export class Category implements ICategory {
  constructor(public id?: number, public name?: string | null, public competences?: ICompetence[] | null) {}
}

export function getCategoryIdentifier(category: ICategory): number | undefined {
  return category.id;
}
