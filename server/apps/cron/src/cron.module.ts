import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";
import { TypeOrmModule } from "@nestjs/typeorm";
import Post from "../../server/src/posts/entities/post.entity";
import { DatabaseModule } from "../../shared/database/database.module";
import { CronService } from "./cron.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([Post]),
    ScheduleModule.forRoot(),
    DatabaseModule,
  ],
  providers: [CronService],
})
export class CronModule {}
