import { MailerService } from '@nestjs-modules/mailer/dist/mailer.service';

export const mailerServiceMock = {
  provide: MailerService,
  useValue: {
    sendMail: jest.fn(),
  },
};
