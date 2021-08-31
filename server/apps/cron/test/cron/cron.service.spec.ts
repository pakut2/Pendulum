import { ConfigModule } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Post } from "../../../server/src/posts/entities/post.entity";
import { PostsService } from "../../../server/src/posts/posts.service";
import { CronService } from "../../../cron/src/cron.service";
import configuration from "../../../shared/config/configuration";
import { ScheduleModule } from "@nestjs/schedule";
import { DateTime } from "luxon";
import { mockPost } from "../../../server/test/utils/mocks/mockPost";

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

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("when checking posts", () => {
    describe("and there are no likes", () => {
      beforeEach(() => {
        mockPost.createdAt = DateTime.local().minus({ minutes: 6 }).toJSDate();
      });

      it("should delete the post after 5mins", async () => {
        jest.spyOn(service, "postCheck");
        expect(service.postCheck(mockPost)).resolves;
      });
    });

    describe("and there is one like", () => {
      beforeEach(() => {
        mockPost.likes.push("1");
        mockPost.createdAt = DateTime.local().minus({ minutes: 11 }).toJSDate();
      });

      it("should delete the post after 10mins", async () => {
        jest.spyOn(service, "postCheck");
        expect(service.postCheck(mockPost)).resolves;
      });
    });

    describe("and there is more than 1 like", () => {
      beforeEach(() => {
        mockPost.likes.push("1", "2");
        mockPost.createdAt = DateTime.local().minus({ minutes: 16 }).toJSDate();
      });

      it("should delete the post after 15mins", async () => {
        jest.spyOn(service, "postCheck");
        expect(service.postCheck(mockPost)).resolves;
      });
    });
  });
});
