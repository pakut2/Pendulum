import { ConfigModule } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import configuration from "../../../shared/config/configuration";
import { PublicFile } from "../../../server/src/files/entities/publicFile.entity";
import { FilesService } from "../../../server/src/files/files.service";
import { FilesController } from "../../src/files/files.controller";

describe("FilesController", () => {
  let controller: FilesController;
  let service: FilesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({ load: [configuration] })],
      controllers: [FilesController],
      providers: [
        FilesService,
        {
          provide: getRepositoryToken(PublicFile),
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<FilesController>(FilesController);
    service = await module.get<FilesService>(FilesService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("when getting signed URL", () => {
    it("should return an object containing url and key", async () => {
      const result = await controller.getSignedUrl({ filename: "file" });

      expect(result).toEqual(expect.any(Object));
      expect(result.presignedURL).toEqual(expect.stringContaining("file"));
      expect(result.key).toEqual(expect.stringContaining("file"));
    });
  });
});
