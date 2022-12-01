import { SessionType } from '../../database';

export async function generateSessionTypeAsync(sessionTypeName: string) {
  const sessionType = await SessionType.create({
    session_type_name: sessionTypeName,
  });

  return sessionType;
}
