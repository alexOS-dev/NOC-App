export enum LogSeverityLevel {
  low = 'low',
  medium = 'medium',
  high = 'high',
}

export interface LogEntityOptions {
  level: LogSeverityLevel; // Enum
  message: string;
  createdAt?: Date;
  origin: string;
}

export class LogEntity {
  public level: LogSeverityLevel; // Enum
  public message: string;
  public createdAt: Date;
  public origin: string;

  constructor(options: LogEntityOptions) {
    const { message, level, origin, createdAt = new Date() } = options;
    this.message = message;
    this.level = level;
    this.createdAt = createdAt;
    this.origin = origin;
  }

  // This method is used to convert the LogEntity instance to a JSON string
  static fromJson(json: string): LogEntity {
    const { message, level, createdAt, origin } = JSON.parse(json);

    if (!message || !level || !createdAt) throw new Error('Invalid JSON');

    const log = new LogEntity({
      message,
      level,
      createdAt,
      origin,
    });
    log.createdAt = new Date(createdAt);

    return log;
  }
}
