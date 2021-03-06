import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FilesService } from "./files.service";
import { ConfigModule } from "@nestjs/config";
import { FilesController } from "./files.controller";
import { PublicFile } from "./entities/publicFile.entity";

@Module({
  imports: [TypeOrmModule.forFeature([PublicFile]), ConfigModule],
  providers: [FilesService],
  exports: [FilesService],
  controllers: [FilesController],
})
export class FilesModule {}
