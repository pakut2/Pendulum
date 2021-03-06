import { Injectable, OnModuleInit, Logger } from "@nestjs/common";
import { SchedulerRegistry } from "@nestjs/schedule";
import { InjectRepository } from "@nestjs/typeorm";
import { CronJob } from "cron";
import { Repository } from "typeorm";
import { Post } from "../../server/src/posts/entities/post.entity";
import { DateTime } from "luxon";

@Injectable()
export class CronService {
  constructor(
    @InjectRepository(Post) private postsRepository: Repository<Post>,
    private readonly schedulerRegistry: SchedulerRegistry
  ) {}

  private readonly logger = new Logger(CronService.name);

  postJob() {
    const job = new CronJob("* * * * *", async () => {
      this.logger.log("Running Cron Job - S&D");
      const posts = await this.postsRepository.find();

      posts.forEach(async (post) => {
        await this.postCheck(post);
      });
    });
    this.schedulerRegistry.addCronJob(`${Date.now()}-S&D`, job);
    job.start();
  }

  async postCheck(post) {
    const formattedTime = DateTime.fromISO(post.createdAt.toISOString());
    const diff = DateTime.now().diff(formattedTime, ["hours", "minutes"]);
    const likesAmount = post.likes.length;
    const minLikes = 0;
    const minTimeDiff = 5;

    if (likesAmount === minLikes && diff.minutes >= minTimeDiff) {
      this.logger.log(`Deleting Post - ${post.id}`);
      await this.postsRepository.delete(post.id);
    }

    if (likesAmount === minLikes + 1 && diff.minutes >= minTimeDiff + 5) {
      this.logger.log(`Deleting Post - ${post.id}`);
      await this.postsRepository.delete(post.id);
    }

    if (likesAmount > minLikes + 1 && diff.minutes >= minTimeDiff + 10) {
      this.logger.log(`Deleting Post - ${post.id}`);
      await this.postsRepository.delete(post.id);
    }
  }
}
