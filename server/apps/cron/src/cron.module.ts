import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ScheduleModule } from "@nestjs/schedule";
import { TypeOrmModule } from "@nestjs/typeorm";
import configuration from "../../shared/config/configuration";
import { Post } from "../../server/src/posts/entities/post.entity";
import { DatabaseModule } from "../../shared/database/database.module";
import { CronService } from "./cron.service";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    TypeOrmModule.forFeature([Post]),
    ScheduleModule.forRoot(),
    DatabaseModule,
  ],
  providers: [CronService],
})
export class CronModule {}
