import { ICategory } from 'app/entities/category/category.model';
import { IEmployee } from 'app/entities/employee/employee.model';

export interface ICompetence {
  id?: number;
  name?: string | null;
  level?: number | null;
  category?: ICategory | null;
  employee?: IEmployee | null;
}

export class Competence implements ICompetence {
  constructor(
    public id?: number,
    public name?: string | null,
    public level?: number | null,
    public category?: ICategory | null,
    public employee?: IEmployee | null
  ) {}
}

export function getCompetenceIdentifier(competence: ICompetence): number | undefined {
  return competence.id;
}
