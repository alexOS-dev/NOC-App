import { envs } from './envs.plugin';

describe('envs.plugin.ts', () => {
  test('should return env options', () => {
    expect(envs).toEqual({
      PORT: 3001,
      MAILER_SERVICE: 'gmail',
      MAILER_EMAIL: 'alexoliva87464@gmail.com',
      MAILER_SECRET_KEY: 'rszr hirs nmgf wnuw',
      PROD: false,
      MONGO_URL: 'mongodb://alex:123456789@localhost:27017/',
      MONGO_NAME: 'NOC-TEST',
      MONGO_USER: 'alex',
      MONGO_PASS: '123456789',
    });
  });
});
