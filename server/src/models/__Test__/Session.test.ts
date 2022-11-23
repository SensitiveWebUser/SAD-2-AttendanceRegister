import { Session } from '../Session';

const sessionTestData = {
  id: '1',
  type: '1',
  tutor: '1',
  startTime: new Date(),
  endTime: new Date(),
  code: '1234',
};

const _session = new Session(
  sessionTestData.id,
  sessionTestData.type,
  sessionTestData.tutor,
  sessionTestData.startTime,
  sessionTestData.endTime,
  sessionTestData.code
);

describe('Session model', () => {
  it('has a module', () => {
    expect(_session).toBeDefined();
  });
});

// Test session getter and setter methods
describe('Session model getter and setter methods', () => {
  it('getId method returns the correct id', () => {
    expect(_session.getId()).toEqual(sessionTestData.id);
  });

  it('getSessionType method returns the correct session type', () => {
    expect(_session.getSessionType()).toEqual(sessionTestData.type);
  });

  it('getTutor method returns the correct tutor', () => {
    expect(_session.getTutor()).toEqual(sessionTestData.tutor);
  });

  it('getStartTime method returns the correct start time', () => {
    expect(_session.getStartTime()).toEqual(sessionTestData.startTime);
  });

  it('getEndTime method returns the correct end time', () => {
    expect(_session.getEndTime()).toEqual(sessionTestData.endTime);
  });

  it('getSessionCode method returns the correct session code', () => {
    expect(_session.getSessionCode()).toEqual(sessionTestData.code);
  });
});
