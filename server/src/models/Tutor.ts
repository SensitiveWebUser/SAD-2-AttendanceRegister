import { Session, User, userConstructorParams } from '@Models';

import { Session as SessionSchema } from '@Database';

export class Tutor extends User {
  constructor({
    userId,
    firstName,
    middleName,
    lastName,
    email,
    userTypeId,
  }: constructorParams) {
    super({ userId, firstName, middleName, lastName, email, userTypeId });
  }

  // get all sessions for this tutor as a array of Session objects
  public getSessions = async (): Promise<Array<Session>> => {
    const sessions = await SessionSchema.findAll({
      where: {
        tutor_id: this.getId(),
      },
    });

    //TODO: better mapping of data
    return sessions.map(
      (sessionData) =>
        new Session({
          sessionId: sessionData.dataValues.session_id,
          sessionTypeId: sessionData.dataValues.session_type_id,
          tutorId: sessionData.dataValues.tutor_id,
          moduleId: sessionData.dataValues.module_id,
          startTimestamp: sessionData.dataValues.start_timestamp,
          endTimestamp: sessionData.dataValues.end_timestamp,
          code: sessionData.dataValues.code,
        })
    );
  };
}

interface constructorParams extends userConstructorParams {}

export { constructorParams as tutorConstructorParams };
