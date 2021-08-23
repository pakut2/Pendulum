import { ConfigModule } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import PublicFile from "../../../server/src/files/entities/publicFile.entity";
import configuration from "../../../shared/config/configuration";
import { FilesService } from "../../src/files/files.service";

describe("FilesService", () => {
  let service: FilesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({ load: [configuration] })],
      providers: [
        FilesService,
        {
          provide: getRepositoryToken(PublicFile),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<FilesService>(FilesService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
