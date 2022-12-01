import { Session } from '../../database';

export async function generateSessionAsync(
  sessionTypeId: string,
  tutorId: string,
  moduleId: string
) {
  const session = await Session.create({
    session_type_id: sessionTypeId,
    tutor_id: tutorId,
    module_id: moduleId,
    start_timestamp: new Date(),
    end_timestamp: new Date(),
    code: 'abcd',
  });

  return session;
}
