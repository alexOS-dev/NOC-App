import { LogDataSource } from '../../domain/datasources';
import { LogEntity, LogSeverityLevel } from '../../domain/entities';
import { LogRepository } from '../../domain/repository';

export class LogRepositoryImplementation implements LogRepository {
  constructor(private readonly logDataSource: LogDataSource) {}

  async saveLog(log: LogEntity): Promise<void> {
    return this.logDataSource.saveLog(log);
  }
  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    return this.logDataSource.getLogs(severityLevel);
  }
}
