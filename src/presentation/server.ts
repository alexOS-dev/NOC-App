import { SendEmailLogs } from '../domain/use-cases/email/send-email-logs';
import { FileSystemDataSource } from '../infrastructure/datasources/file-system.datasource';
import { LogRepositoryImplementation } from '../infrastructure/repositories';

import { EmailService } from './email/email.service';

const fileSystemLogRepository = new LogRepositoryImplementation(
  new FileSystemDataSource()
);
const emailService = new EmailService();

export class Server {
  public static start() {
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

    // CronService.createJob('*/5 * * * * *', () => {
    //   const url = 'https://www.google.com';
    //   // const url = 'http//localhost:3000';
    //   new CheckService(
    //     fileSystemLogRepository,
    //     () => console.log(`${url} is ok`),
    //     (error) => console.log(error)
    //   ).execute(url);
    // });
  }
}
