import { Tutor, tutorConstructorParams } from './Tutor';
import { Student } from './Student';

export class AcademicAdvisor extends Tutor {
  constructor({
    user_id,
    first_name,
    middle_name,
    last_name,
    email,
    user_type_id,
  }: constructorParams) {
    super({ user_id, first_name, middle_name, last_name, email, user_type_id });
  }

  public getAdviseeList() {}
}

interface constructorParams extends tutorConstructorParams {}
