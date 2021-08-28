import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import PublicFile from "./entities/publicFile.entity";
import { S3 } from "aws-sdk";
import { ConfigService } from "@nestjs/config";
import { v4 as uuid } from "uuid";

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(PublicFile)
    private publicFilesRepository: Repository<PublicFile>,
    private readonly configService: ConfigService
  ) {}

  private readonly logger = new Logger(FilesService.name);

  async getSignedUrl(filename: string) {
    this.logger.log(`Getting s3 presignedURL - ${filename}`);
    const s3 = new S3();

    const key = `avatars/${uuid()}-${filename}`;

    const presignedURL = s3.getSignedUrl("putObject", {
      Bucket: this.configService.get("AWS_PUBLIC_BUCKET_NAME"),
      Key: key,
      Expires: 3600,
    });

    return { presignedURL, key };
  }

  async updateFilesRepository(key: string) {
    this.logger.log(`File Repository / Updating - ${key}`);

    const newFile = this.publicFilesRepository.create({
      key: key,
      url: `https://${this.configService.get(
        "AWS_PUBLIC_BUCKET_NAME"
      )}.s3.${this.configService.get("AWS_REGION")}.amazonaws.com/${key}`,
    });

    await this.publicFilesRepository.save(newFile);
    return newFile;
  }

  // async uploadPublicFile(dataBuffer: Buffer, filename: string) {
  //   this.logger.log(`Uploading avatar - ${filename}`);
  //   const s3 = new S3();
  //   const uploadResult = await s3
  //     .upload({
  //       Bucket: this.configService.get("AWS_PUBLIC_BUCKET_NAME"),
  //       Body: dataBuffer,
  //       Key: `avatars/${uuid()}-${filename}`,
  //     })
  //     .promise();

  //   const newFile = this.publicFilesRepository.create({
  //     key: uploadResult.Key,
  //     url: uploadResult.Location,
  //   });

  //   await this.publicFilesRepository.save(newFile);
  //   return newFile;
  // }

  async deletePublicFile(fileId: string) {
    this.logger.log(`Deleting avatar - ${fileId}`);
    const file = await this.publicFilesRepository.findOne({ id: fileId });
    const s3 = new S3();
    await s3
      .deleteObject({
        Bucket: this.configService.get("AWS_PUBLIC_BUCKET_NAME"),
        Key: file.key,
      })
      .promise();
    await this.publicFilesRepository.delete(fileId);
  }
}
