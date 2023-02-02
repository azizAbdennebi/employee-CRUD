import { ICompetence } from 'app/entities/competence/competence.model';

export interface IEmployee {
  id?: number;
  name?: string | null;
  firstName?: string | null;
  address?: string | null;
  competences?: ICompetence[] | null;
}

export class Employee implements IEmployee {
  constructor(
    public id?: number,
    public name?: string | null,
    public firstName?: string | null,
    public address?: string | null,
    public competences?: ICompetence[] | null
  ) {}
}

export function getEmployeeIdentifier(employee: IEmployee): number | undefined {
  return employee.id;
}
