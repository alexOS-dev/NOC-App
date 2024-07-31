import { CheckService } from '../domain/use-cases/checks';
import { FileSystemDataSource } from '../infrastructure/datasources/file-system.datasource';
import { LogRepositoryImplementation } from '../infrastructure/repositories';
import { CronService } from './cron';
import { EmailService } from './email/email.service';

const fileSystemLogRepository = new LogRepositoryImplementation(
  new FileSystemDataSource()
);

export class Server {
  public static start() {
    console.log('Server started');

    // TODO: Send mail
    // const emailService = new EmailService(fileSystemLogRepository);

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
