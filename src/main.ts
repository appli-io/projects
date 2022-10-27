import { NestFactory }    from '@nestjs/core';
import { Transport }      from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';

import { AllExceptionFilter }  from '@infrastructure/common/filter/exceptions.filter';
import { LoggerService }       from '@infrastructure/logger/logger.service';
import { LoggerInterceptor }   from '@infrastructure/common/interceptor/logger.interceptor';
import { ResponseInterceptor } from '@infrastructure/common/interceptor/response.interceptor';
import { AppModule }                      from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,                    // Ignorar datos que no esten en los DTO
      forbidNonWhitelisted: true,         // Lanzar error si existen datos prohibidos
      disableErrorMessages: true,         // Desabilitar mensajes de error (producción)
    })
  );
  app.useGlobalFilters(new AllExceptionFilter(new LoggerService()));

  app.useGlobalInterceptors(new LoggerInterceptor(new LoggerService()));
  app.useGlobalInterceptors(new ResponseInterceptor());

  const config = new DocumentBuilder()
    .setTitle('Vissue Authentication Microservice')
    .setDescription('The Vissue Authentication Microservice API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // http://localhost:port/api

  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: 4010
    }
  });

  await app.listen(3000);
}

bootstrap().then();
