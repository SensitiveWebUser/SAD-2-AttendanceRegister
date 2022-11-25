import { Session } from '../Session';

const sessionTestData = {
  sessionId: '1',
  sessionTypeId: '1',
  tutorId: '1',
  moduleId: '1',
  startTimestamp: 1213212123,
  endTimestamp: 32132132132,
  code: '1234',
};

const _session = new Session(sessionTestData);

describe('Session model', () => {
  it('has a module', () => {
    expect(_session).toBeDefined();
  });
});

// Test session getter and setter methods
describe('Session model getter and setter methods', () => {
  it('getId method returns the correct id', () => {
    expect(_session.getId()).toEqual(sessionTestData.sessionId);
  });

  it('getSessionType method returns the correct session type', () => {
    expect(_session.getSessionTypeId()).toEqual(sessionTestData.sessionTypeId);
  });

  it('getTutor method returns the correct tutor', () => {
    expect(_session.getTutorId()).toEqual(sessionTestData.tutorId);
  });

  it('getStartTime method returns the correct start time', () => {
    expect(_session.getStartTime()).toEqual(
      new Date(sessionTestData.startTimestamp)
    );
  });

  it('getEndTime method returns the correct end time', () => {
    expect(_session.getEndTime()).toEqual(
      new Date(sessionTestData.endTimestamp)
    );
  });

  it('getSessionCode method returns the correct session code', () => {
    expect(_session.getSessionCode()).toEqual(sessionTestData.code);
  });
});
