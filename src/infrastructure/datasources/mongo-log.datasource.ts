import { LogModel } from '../../data/mongo';
import { LogDataSource } from '../../domain/datasources';
import { LogEntity, LogSeverityLevel } from '../../domain/entities';

export class MongoLogDatasource implements LogDataSource {
  async saveLog(log: LogEntity): Promise<void> {
    const newLog = await LogModel.create(log);
  }

  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    const logs = await LogModel.find({ level: severityLevel });

    return logs.map(LogEntity.fromObject);
  }
}
