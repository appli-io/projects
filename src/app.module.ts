import { Module }       from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { getEnvPath }       from '@infrastructure/helpers/env.helper';
import { LoggerModule }     from '@infrastructure/logger/logger.module';
import { ExceptionsModule } from '@infrastructure/exceptions/exceptions.module';
import appConfig            from '@infrastructure/config/environment/app.config';
import databaseConfig       from '@infrastructure/config/environment/database.config';
import authConfig           from '@infrastructure/config/environment/auth.config';

import { DomainModule }  from '@domain/domain.module';
import { ProjectModule } from '@modules/project/project.module';
import { TaskModule }    from '@modules/task/task.module';
import { EpicModule }    from '@modules/epic/epic.module';

import { AppController }    from './app.controller';
import { AppService }       from './app.service';
import clientRegisterConfig from '@infrastructure/config/environment/client-register.config';

const envFilePath: string = getEnvPath(`${ __dirname }/envs`);

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath,
      isGlobal: true,
      load: [appConfig, databaseConfig, authConfig, clientRegisterConfig]
    }),
    LoggerModule,
    ExceptionsModule,
    DomainModule,
    ProjectModule,
    EpicModule,
    TaskModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
