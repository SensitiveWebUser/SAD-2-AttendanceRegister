import { Session } from '@Models';
import { User, userConstructorParams } from './User';

import { Session as SessionSchema } from '@Database';

export class Tutor extends User {
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

  public getSessions = async (): Promise<Array<Session>> => {
    const sessions = await SessionSchema.findAll({
      where: {
        tutor_id: this.getId(),
      },
    });

    return sessions.map((session) => new Session(session.dataValues));
  };
}

interface constructorParams extends userConstructorParams {}

export { constructorParams as tutorConstructorParams };
