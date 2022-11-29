import { Session as SessionSchema } from '../database';
import { Session, User, UserToJsonReturn } from '../models';

export class Tutor extends User {
  constructor({ userObject }: constructorParams) {
    super(userObject);
  }

  public getSessions = async (): Promise<Session[]> => {
    const sessions = await SessionSchema.findAll({
      where: {
        tutor_id: this.id,
      },
    });

    if (!sessions) return [];

    const sessionsArray = sessions.map(async (session: any) => {
      return new Session({
        id: session.dataValues.session_id,
        type: session.dataValues.session_type_id,
        moduleId: session.dataValues.module_id,
        startTimestamp: new Date(session.dataValues.start_timestamp),
        endTimestamp: new Date(session.dataValues.end_timestamp),
        code: session.dataValues.code,
      });
    });

    return Promise.all(sessionsArray);
  };

  async tutorSessionsToJsonAsync(): Promise<object[]> {
    const sessions = await this.getSessions();

    const sessionsArray = sessions.map(async (session: Session) => {
      return await session.toJsonAsync();
    });

    return Promise.all(sessionsArray);
  }

  async toJsonAsync(): Promise<toJsonReturn> {
    return {
      ...(await super.toJsonAsync()),
    };
  }
}

type toJsonReturn = UserToJsonReturn;

interface constructorParams {
  userObject: User;
}

export { toJsonReturn as TutorToJsonReturn };
export { constructorParams as TutorConstructorParams };
