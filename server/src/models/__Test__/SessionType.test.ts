import { SessionType } from '../SessionType';

describe('session type tests', () => {
  it('json returns json', async () => {
    const id = '123';
    const name = 'name';

    const sessionType = new SessionType({ id, name });
    expect(JSON.stringify(sessionType.toJson())).toBe(JSON.stringify({ id: id, name: name }));
  });
});
