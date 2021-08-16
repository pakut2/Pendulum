import { Injectable, OnModuleInit } from "@nestjs/common";
import { SchedulerRegistry } from "@nestjs/schedule";
import { InjectRepository } from "@nestjs/typeorm";
import { CronJob } from "cron";
import { Repository } from "typeorm";
import Post from "../../server/src/posts/entities/post.entity";

@Injectable()
export class CronService implements OnModuleInit {
  constructor(
    @InjectRepository(Post) private postsRepository: Repository<Post>,
    private readonly schedulerRegistry: SchedulerRegistry
  ) {}

  onModuleInit() {
    const job = new CronJob("* * * * * *", async () => {
      console.log("it just works");
      // const posts = await this.postsRepository.find();
    });
    this.schedulerRegistry.addCronJob(`${Date.now()}-DELETE`, job);
    job.start();
  }
}
