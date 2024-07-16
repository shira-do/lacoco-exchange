import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GeckoModule } from './gecko/gecko.module';
import { PricesModule } from './prices/prices.module';
import { TokensModule } from './tokens/tokens.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Make ConfigModule global
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [],
        synchronize: configService.get<string>('DB_SYNC') === 'true',
        autoLoadEntities: true,
        debug: true,
      }),
      inject: [ConfigService],
    }),
    ScheduleModule.forRoot(),
    TokensModule,
    PricesModule,
    GeckoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
