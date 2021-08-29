import { ConfigModule } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { PublicFile } from "../../../server/src/files/entities/publicFile.entity";
import configuration from "../../../shared/config/configuration";
import { FilesService } from "../../src/files/files.service";

describe("FilesService", () => {
  let service: FilesService;

  let create: jest.Mock;
  let save: jest.Mock;
  beforeEach(async () => {
    create = jest.fn();
    save = jest.fn();

    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({ load: [configuration] })],
      providers: [
        FilesService,
        {
          provide: getRepositoryToken(PublicFile),
          useValue: { create, save },
        },
      ],
    }).compile();

    service = module.get<FilesService>(FilesService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("when getting signed URL", () => {
    it("should return an object containing url and key", async () => {
      const result = await service.getSignedUrl("file");

      expect(result).toEqual(expect.any(Object));
      expect(result.presignedURL).toEqual(expect.stringContaining("file"));
      expect(result.key).toEqual(expect.stringContaining("file"));
    });
  });

  describe("when creating a new file", () => {
    let file: PublicFile;

    beforeEach(() => {
      file = new PublicFile();
      create.mockReturnValue(Promise.resolve(file));
    });

    it("should return a new file", async () => {
      const newFile = await service.updateFilesRepository("1");
      expect(newFile).toEqual(file);
    });
  });

  describe("when deleting the file from s3", () => {
    it("should throw an error if invalid id is provided", async () => {
      await expect(service.deletePublicFile(null)).rejects.toThrow();
    });
  });
});
