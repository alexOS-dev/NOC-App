import { envs } from '../../config/plugins';
import { LogModel, MongoDatabase } from '../../data/mongo';
import moongose from 'mongoose';
import { MongoLogDatasource } from './mongo-log.datasource';
import { LogEntity, LogSeverityLevel } from '../../domain/entities';

describe('Test for MongoLogDataSource', () => {
  const logDataSource = new MongoLogDatasource();
  const log = new LogEntity({
    level: LogSeverityLevel.medium,
    message: 'test message',
    origin: 'mongo-log.datasource.test.ts',
  });

  beforeAll(async () => {
    await MongoDatabase.connect({
      dbName: envs.MONGO_NAME,
      mongoUrl: envs.MONGO_URL,
    });
  });

  afterEach(async () => {
    await LogModel.deleteMany();
  });

  afterAll(async () => {
    moongose.connection.close();
  });

  test('should create a log', async () => {
    const logSpy = jest.spyOn(console, 'log');

    await logDataSource.saveLog(log);

    expect(logSpy).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledWith(
      'Mongo Log created',
      expect.any(String)
    );
  });

  test('should get logs', async () => {
    await logDataSource.saveLog(log);
    await logDataSource.saveLog(log);

    const logs = await logDataSource.getLogs(LogSeverityLevel.medium);

    expect(logs.length).toBe(2);
    expect(logs[0].level).toBe(LogSeverityLevel.medium);
  });
});
