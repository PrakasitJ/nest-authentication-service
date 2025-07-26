import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { NatsConfig } from './configs/nats.config';
import { WebConfig } from './configs/web.config';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.NATS,
      options: {
        servers: [NatsConfig.natsUrl],
      },
    },
  );
  
  // Enable validation for microservice
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));
  
  await app.listen();

  const webApp = await NestFactory.create(AppModule);
  
  // Enable validation for web app
  webApp.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));
  
  await webApp.listen(WebConfig.port);

  
  console.log(
    'Microservice is listening on port',
    NatsConfig.port,
    'HTTP server is listening on port',
    WebConfig.port,
  );
}
bootstrap();
