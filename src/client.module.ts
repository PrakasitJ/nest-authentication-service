import { ClientsModule, Transport } from "@nestjs/microservices";
import { NatsConfig } from "./configs/nats.config";
import { EmailClient } from "./clients/EmailClient";
import { Module } from "@nestjs/common";
import { NatsService } from "./services/nats.service";

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'EMAIL_CLIENT',
        transport: Transport.NATS,
        options: {
          servers: [NatsConfig.natsUrl],
        },
      },
    ]),
  ],
  providers: [EmailClient, NatsService],
  exports: [EmailClient, NatsService],
})
export class ClientModule {}