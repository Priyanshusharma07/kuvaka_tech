import { TypeOrmModule } from "@nestjs/typeorm";
import { LeadsModule } from "./leads/leads.module";
import { OffersModule } from "./offers/offers.module";
import { ConfigModule } from "@nestjs/config";
import { Module } from "@nestjs/common";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => {
        const {
          DB_HOST,
          DB_PORT,
          DB_USERNAME,
          DB_PASSWORD,
          DB_DATABASE,
        } = process.env;

        if (!DB_HOST || !DB_PORT || !DB_USERNAME || !DB_PASSWORD || !DB_DATABASE) {
          console.error(' Loaded DB env vars:', {
            DB_HOST,
            DB_PORT,
            DB_USERNAME,
            DB_PASSWORD: DB_PASSWORD,
            DB_DATABASE,
          });
          throw new Error(' Missing database configuration in environment variables.');
        }

        return {
          type: 'postgres',
          host: DB_HOST,
          port: parseInt(DB_PORT, 10),
          username: DB_USERNAME,
          password: DB_PASSWORD,
          database: DB_DATABASE,
          autoLoadEntities: true,
          synchronize: true,
        };
      },
    }),
    OffersModule,
    LeadsModule,
  ],
})
export class AppModule {}
