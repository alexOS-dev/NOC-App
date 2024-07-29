import { CheckService } from '../domain/use-cases/checks';
import { CronService } from './cron';

export class Server {
  public static start() {
    console.log('Server started');

    CronService.createJob('*/5 * * * * *', () => {
      const url = 'https://www.google.com';
      new CheckService(
        () => console.log(`${url} is ok`),
        (error) => console.log(error)
      ).execute(url);
    });
  }
}
