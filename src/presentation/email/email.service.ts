import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins';
import { LogRepository } from '../../domain/repository';
import { LogEntity } from '../../domain/entities';
import { LogSeverityLevel } from '../../domain/entities/log.entity';

interface SendMailOptions {
  to: string | string[];
  subject: string;
  htmlBody: string;
  attachments: Attachment[];
}

interface Attachment {
  fileName: string;
  path: string;
}

export class EmailService {
  private transporter = nodemailer.createTransport({
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY,
    },
  });

  constructor(private readonly logRepository: LogRepository) {}

  async sendEmail(options: SendMailOptions): Promise<boolean> {
    const { to, subject, htmlBody, attachments = [] } = options;

    try {
      const sentInformation = await this.transporter.sendMail({
        to: to,
        subject: subject,
        html: htmlBody,
        attachments: attachments,
      });

      const log = new LogEntity({
        level: LogSeverityLevel.low,
        message: 'Email sent',
        origin: 'email.service.ts',
      });
      this.logRepository.saveLog(log);

      return true;
    } catch (error) {
      const log = new LogEntity({
        level: LogSeverityLevel.high,
        message: 'Email not sent',
        origin: 'email.service.ts',
      });
      this.logRepository.saveLog(log);

      return false;
    }
  }

  async sendEmailWithFileSystemLogs(to: string | string[]) {
    const subject = 'Server Logs';
    const htmlBody = `
      <html>
        <body>
          <h1>Logs del Sistema NOC</h1>
          <p>Adjunto encontrarás los logs recientes del sistema:</p>
          <ul>
            <li><strong>logs-all.log</strong>: Todos los logs del sistema.</li>
            <li><strong>logs-high.log</strong>: Logs de alta prioridad.</li>
            <li><strong>logs-medium.log</strong>: Logs de prioridad media.</li>
          </ul>
          <p>Por favor, revisa los archivos adjuntos para más detalles.</p>
          <p>Atentamente,<br>El equipo de NOC</p>
        </body>
      </html>
    `;
    const attachments: Attachment[] = [
      {
        fileName: 'logs-all.log',
        path: './logs/logs-all.log',
      },
      {
        fileName: 'logs-high.log',
        path: './logs/logs-high.log',
      },
      {
        fileName: 'logs-medium.log',
        path: './logs/logs-medium.log',
      },
    ];

    this.sendEmail({ to, subject, attachments, htmlBody });
  }
}
