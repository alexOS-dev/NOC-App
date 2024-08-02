import { LogEntity, LogSeverityLevel } from '../entities';
import { LogDataSource } from './log.datasource';

describe('log.datasource.ts', () => {
  const newLog = new LogEntity({
    origin: 'log.datasource.ts',
    message: 'log message',
    level: LogSeverityLevel.low,
  });

  class MockLogDataSource implements LogDataSource {
    async saveLog(log: any): Promise<void> {
      return;
    }
    async getLogs(severityLevel: any): Promise<any[]> {
      return [newLog];
    }
  }

  test('log should test the abstract class', async () => {
    const mockLogDataSource = new MockLogDataSource();

    expect(mockLogDataSource).toBeInstanceOf(MockLogDataSource);
    expect(typeof mockLogDataSource.saveLog).toBe('function');
    expect(typeof mockLogDataSource.getLogs).toBe('function');

    await mockLogDataSource.saveLog(newLog);
  });
});
