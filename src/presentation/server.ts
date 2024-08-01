import { LogSeverityLevel } from '../domain/entities';
import { CheckService } from '../domain/use-cases/checks';
import { SendEmailLogs } from '../domain/use-cases/email/send-email-logs';
import { FileSystemDataSource } from '../infrastructure/datasources/file-system.datasource';
import { MongoLogDatasource } from '../infrastructure/datasources/mongo-log.datasource';
import { LogRepositoryImplementation } from '../infrastructure/repositories';
import { CronService } from './cron';

import { EmailService } from './email/email.service';

const logRepository = new LogRepositoryImplementation(
  // new FileSystemDataSource()
  new MongoLogDatasource()
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

    const logs = await logRepository.getLogs(LogSeverityLevel.low);
    console.log(logs);
    // CronService.createJob('*/5 * * * * *', () => {
    //   const url = 'https://www.google.com';
    //   // const url = 'http//localhost:3000';
    //   new CheckService(
    //     logRepository,
    //     () => console.log(`${url} is ok`),
    //     (error) => console.log(error)
    //   ).execute(url);
    // });
  }
}
