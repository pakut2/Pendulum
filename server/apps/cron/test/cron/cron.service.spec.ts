import { ConfigModule } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import Post from "../../../server/src/posts/entities/post.entity";
import { PostsService } from "../../../server/src/posts/posts.service";
import { CronService } from "../../../cron/src/cron.service";
import PublicFile from "../../../server/src/files/entities/publicFile.entity";
import configuration from "../../../shared/config/configuration";
import { ScheduleModule } from "@nestjs/schedule";

describe("FilesService", () => {
  let service: CronService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ load: [configuration] }),
        ScheduleModule.forRoot(),
      ],
      providers: [
        CronService,
        PostsService,
        {
          provide: getRepositoryToken(Post),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<CronService>(CronService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
