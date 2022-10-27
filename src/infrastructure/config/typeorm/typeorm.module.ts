import { Module }               from '@nestjs/common';
import { TypeOrmModule }        from '@nestjs/typeorm';
import { ConfigModule }         from '@nestjs/config';
import { TypeOrmConfigService } from '@infrastructure/config/typeorm/typeorm-config.service';
import { DataSource }           from 'typeorm';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      dataSourceFactory: async (options) => {
        return await new DataSource(options).initialize();
      }
    }),
  ],
  providers: [TypeOrmConfigService],
})
export class TypeOrmConfigModule {}
