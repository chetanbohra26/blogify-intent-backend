import { ConfigService, Injectable, Mail, MailMessage } from "@intentjs/core";

@Injectable()
export class MailService {
  async welcomeMail(firstName: string, email: string) {
    const appSettings = ConfigService.get('app') || {};
    const settings = ConfigService.get('settings') || {};
    const mail = MailMessage
      .init()
      .greeting(`Dear ${firstName}`)
      .line(
        'We onboard you with great joy. We are looking forward to see blogs from you',
      )
      .button('Dashboard', settings.frontendUrl)
      .subject(`${appSettings.name}: Welcome onboard`);

    await Mail
      .init()
      .to(email)
      .send(mail);
  }
}