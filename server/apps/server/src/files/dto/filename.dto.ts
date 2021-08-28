import { IsString, IsNotEmpty } from "class-validator";

export class FilenameDto {
  @IsString()
  @IsNotEmpty()
  filename: string;
}
