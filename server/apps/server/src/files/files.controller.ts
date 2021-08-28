import { Body, Controller, Post } from "@nestjs/common";
import { FilenameDto } from "./dto/filename.dto";
import { FilesService } from "./files.service";

@Controller("files")
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post()
  getSignedUrl(@Body() filenameDto: FilenameDto) {
    return this.filesService.getSignedUrl(filenameDto.filename);
  }
}
