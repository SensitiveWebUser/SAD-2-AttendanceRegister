import request from 'supertest';
import { app } from '../../app';

import { v4 as uuidv4 } from 'uuid';

const USER_ID = uuidv4();

it('returns a 401 if the user is not authenticated', async () => {
  await request(app).get(`/api/users?user_id=${USER_ID}`).send().expect(401);
});
