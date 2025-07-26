import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PubAck } from 'nats';
import { firstValueFrom } from 'rxjs';
import { SendEmailPayloadDTO } from 'src/models/dtos/SendEmailPayloadDTO';
import { NatsService } from 'src/services/nats.service';

@Injectable()
export class EmailClient {
  private static readonly logger: Logger = new Logger(EmailClient.name);
  constructor(@Inject('EMAIL_CLIENT') private client: ClientProxy) {}

  async sendEmail(emailData: SendEmailPayloadDTO): Promise<string> {
    return firstValueFrom(this.client.send('sendEmail', emailData));
  }

  async publishEmailToStream(
    emailData: SendEmailPayloadDTO,
  ): Promise<PubAck> {
    try {
      const subjects = 'email.send';

      const { js } = await NatsService.createConnection();
      const ack = await NatsService.publishToStream<SendEmailPayloadDTO>(js, subjects, emailData);
      return ack;
    } catch (error) {
      EmailClient.logger.error('❌ Error publishing to JetStream:', error);
      throw error;
    }
  }
}
