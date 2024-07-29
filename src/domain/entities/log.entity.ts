export enum LogSeverityLevel {
  low = 'low',
  medium = 'medium',
  high = 'high',
}

export class LogEntity {
  public level: LogSeverityLevel; // Enum
  public message: string;
  public createdAt: Date;

  constructor(message: string, level: LogSeverityLevel) {
    this.message = message;
    this.level = level;
    this.createdAt = new Date();
  }

  // This method is used to convert the LogEntity instance to a JSON string
  static fromJson(json: string): LogEntity {
    const { message, level, createdAt } = JSON.parse(json);

    if (!message || !level || !createdAt) throw new Error('Invalid JSON');

    const log = new LogEntity(message, level);
    log.createdAt = new Date(createdAt);

    return log;
  }
}
