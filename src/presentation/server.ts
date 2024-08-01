import { CheckServiceMultiple } from '../domain/use-cases/checks/check-service-multiple.ts';
import { FileSystemDataSource } from '../infrastructure/datasources/file-system.datasource';
import { MongoLogDatasource } from '../infrastructure/datasources/mongo-log.datasource';
import { PostgresLogDatasource } from '../infrastructure/datasources/postgres-log.datasource';
import { LogRepositoryImplementation } from '../infrastructure/repositories';
import { CronService } from './cron';

import { EmailService } from './email/email.service';

const fslogRepository = new LogRepositoryImplementation(
  new FileSystemDataSource()
);
const mongoLogRepository = new LogRepositoryImplementation(
  new MongoLogDatasource()
);
const postgresLogRepository = new LogRepositoryImplementation(
  new PostgresLogDatasource()
);

const emailService = new EmailService();

export class Server {
  public static async start() {
    console.log('Server started');

    // TODO: Send email
    // new SendEmailLogs(emailService, fileSystemLogRepository).execute([
    //   'alexoliva.developer@gmail.com',
    //   'alex.oliva.dev@gmail.com',
    // ]);
    // emailService.sendEmailWithFileSystemLogs([
    //   'alexoliva.developer@gmail.com',
    //   'alex.oliva.dev@gmail.com',
    // ]);

    // const logs = await logRepository.getLogs(LogSeverityLevel.low);
    // console.log(logs);

    CronService.createJob('*/5 * * * * *', () => {
      const url = 'https://www.google.com';
      // const url = 'http//localhost:3000';
      new CheckServiceMultiple(
        [fslogRepository, mongoLogRepository, postgresLogRepository],
        () => console.log(`${url} is ok`),
        (error) => console.log(error)
      ).execute(url);
    });
  }
}
